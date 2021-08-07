class GoApi {
    private baseUrl: string = 'http://www.golery.com:8200';
    async uploadImage(blob): Promise<{key: string}> {
        const url = `${this.baseUrl}/api2/file/pencil`;

        const formData = new FormData();
        formData.append('file', blob);
        const response = await fetch(url, {
            method: 'POST', body: formData
        });
        const json = await response.json();
        console.log(json);
        return json;
    }

    getFileUrl(key: string) {
        return `${this.baseUrl}/api2/file/${key}`
    }
}

export const goApi = new GoApi();