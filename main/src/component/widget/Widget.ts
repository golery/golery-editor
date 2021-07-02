export const WIDGET_IMAGE = 'image';
export const WIDGET_CODE = 'code';

export interface WidgetConfig {
    id: string;
    /** Element type in editor model */
    type: string;
    icon: string;
    name: string;
    getData: () => Promise<any>;
}