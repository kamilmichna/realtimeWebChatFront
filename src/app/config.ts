import { InjectionToken } from '@angular/core';

export interface ICONFIG {
    BACKEND_PATH: string;
}

export const CONFIG = {
    BACKEND_PATH: 'http://localhost:8081',
};

export const APP_CONF_TOKEN = new InjectionToken<ICONFIG>('APP_CONFIG');
