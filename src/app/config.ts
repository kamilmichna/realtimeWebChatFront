import { InjectionToken } from '@angular/core';

export interface ICONFIG {
    BACKEND_PATH: string;
}

export const CONFIG = {
    BACKEND_PATH: 'http://localhost:8080',
};

export const APP_CONF_TOKEN = new InjectionToken<ICONFIG>('APP_CONFIG');
