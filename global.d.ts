type StoreSet<State> = {
    (partial: State | Partial<State> | ((state: State) => State | Partial<State>), replace?: false): void;
    (state: State | ((state: State) => State), replace: true): void;
};

type GaAny = null | undefined | string | number | boolean | symbol | object | [];

type GaAnyVal = string | number | boolean | symbol | object | [];
