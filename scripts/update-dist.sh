#!/bin/bash

# 增量更新脚本：将dist中的文件增量更新到dist1目录
# 用法: bash scripts/update-dist.sh

# 设置语言环境为UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# 定义颜色
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # 恢复默认颜色

# 计数器初始化
NEW_FILES=0
REPLACED_FILES=0
DIRS_CREATED=0

# 临时文件，用于存储计数
TEMP_COUNT_FILE=$(mktemp)
echo "0 0 0" > "$TEMP_COUNT_FILE"

# 源目录和目标目录
SOURCE_DIR="dist"
TARGET_DIR="dist1"

# 更新计数器函数
update_count() {
  # $1 - 类型: new, replace, dir
  # 从临时文件中读取当前计数
  read -r new_count replace_count dir_count < "$TEMP_COUNT_FILE"
  
  case "$1" in
    new)
      new_count=$((new_count + 1))
      ;;
    replace)
      replace_count=$((replace_count + 1))
      ;;
    dir)
      dir_count=$((dir_count + 1))
      ;;
  esac
  
  # 写回临时文件
  echo "$new_count $replace_count $dir_count" > "$TEMP_COUNT_FILE"
}

# 检查源目录是否存在
if [ ! -d "$SOURCE_DIR" ]; then
  echo -e "${RED}错误: 源目录 '$SOURCE_DIR' 不存在${NC}"
  rm -f "$TEMP_COUNT_FILE"
  exit 1
fi

# 检查目标目录是否存在，如果不存在则创建
if [ ! -d "$TARGET_DIR" ]; then
  echo -e "${YELLOW}目标目录 '$TARGET_DIR' 不存在，正在创建...${NC}"
  mkdir -p "$TARGET_DIR"
  update_count "dir"
fi

# 更新HTML文件和其他非assets文件
echo -e "${BLUE}正在更新HTML文件和其他非assets文件...${NC}"
for file in "$SOURCE_DIR"/*; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    if [ -f "$TARGET_DIR/$filename" ]; then
      echo -e "${YELLOW}替换: $filename${NC}"
      update_count "replace"
    else
      echo -e "${GREEN}新增: $filename${NC}"
      update_count "new"
    fi
    cp "$file" "$TARGET_DIR/$filename"
  fi
done

# 确保assets目录存在
if [ ! -d "$TARGET_DIR/assets" ] && [ -d "$SOURCE_DIR/assets" ]; then
  mkdir -p "$TARGET_DIR/assets"
  echo -e "${GREEN}创建目录: assets${NC}"
  update_count "dir"
fi

# 更新资源文件 - 按照页面类型处理
if [ -d "$SOURCE_DIR/assets" ]; then
  echo -e "${BLUE}正在更新资源文件...${NC}"
  
  # 遍历源assets目录下的所有子目录
  for subdir in "$SOURCE_DIR/assets"/*; do
    if [ -d "$subdir" ]; then
      subdir_name=$(basename "$subdir")
      
      # 确保目标子目录存在
      if [ ! -d "$TARGET_DIR/assets/$subdir_name" ]; then
        mkdir -p "$TARGET_DIR/assets/$subdir_name"
        echo -e "${GREEN}创建目录: assets/$subdir_name${NC}"
        update_count "dir"
      fi
      
      # 递归复制子目录内容
      echo -e "${BLUE}处理 assets/$subdir_name 目录...${NC}"
      
      # 先创建所有所需目录
      while IFS= read -r -d '' dir; do
        # 获取相对路径
        rel_dir=${dir#$SOURCE_DIR/}
        if [ ! -d "$TARGET_DIR/$rel_dir" ]; then
          mkdir -p "$TARGET_DIR/$rel_dir"
          echo -e "${GREEN}创建目录: $rel_dir${NC}"
          update_count "dir"
        fi
      done < <(find "$subdir" -type d -print0)
      
      # 然后复制所有文件
      while IFS= read -r -d '' file; do
        # 获取相对路径
        rel_file=${file#$SOURCE_DIR/}
        if [ -f "$TARGET_DIR/$rel_file" ]; then
          echo -e "${YELLOW}替换: $rel_file${NC}"
          update_count "replace"
        else
          echo -e "${GREEN}新增: $rel_file${NC}"
          update_count "new"
        fi
        cp "$file" "$TARGET_DIR/$rel_file"
      done < <(find "$subdir" -type f -print0)
    fi
  done
fi

# 读取最终计数
read -r NEW_FILES REPLACED_FILES DIRS_CREATED < "$TEMP_COUNT_FILE"

# 删除临时文件
rm -f "$TEMP_COUNT_FILE"

# 汇总结果
source_files=$(find "$SOURCE_DIR" -type f | wc -l | tr -d ' ')
target_files=$(find "$TARGET_DIR" -type f | wc -l | tr -d ' ')

echo -e "\n${GREEN}增量更新完成!${NC}"
echo -e "${BLUE}源目录文件数: ${GREEN}$source_files${NC}"
echo -e "${BLUE}目标目录文件数: ${GREEN}$target_files${NC}"
echo -e "${BLUE}新增文件数: ${GREEN}$NEW_FILES${NC}"
echo -e "${BLUE}替换文件数: ${GREEN}$REPLACED_FILES${NC}"
echo -e "${BLUE}创建目录数: ${GREEN}$DIRS_CREATED${NC}"
echo -e "${YELLOW}注意: 旧版本未使用的资源文件(如带hash的js/css)未被删除${NC}" 