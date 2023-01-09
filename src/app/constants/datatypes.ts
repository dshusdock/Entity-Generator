export type EntityInfo = {
    entityName: string | null | undefined;
    entityDataType: string | null | undefined;
    entityNullable: boolean,
    entityValidators: string[],
    checked: boolean
}

export enum RECIEVERS {
    APP_MANAGER,
    TOOLBAR,
    ENTITY_CREATOR
}

export enum MSGTYPE {
    EVENT_UPDATE_TOOLBAR,
    EVENT_VALIDATOR_UPDATE,
    EVENT_TASK_RESET,
    EVENT_USER_CHOSEN,
    EVENT_LOGON,
}