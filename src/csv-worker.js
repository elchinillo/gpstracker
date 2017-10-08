// @flow
self.onmessage = (msg) => {
    const items = msg.data;
    const csvBlobBuilder = [];

    let headers = null;
    items.forEach((item) => {
        if (headers === null) {
            headers = Object.keys(item);
            csvBlobBuilder.push(`${headers.join(',')}\n`);
        }

        csvBlobBuilder.push(`${headers.map(key => `"${item[key]}"`).join(',')}\n`);
    });

    const csvBlob = new Blob(csvBlobBuilder, { type: 'text/csv;charset=utf-8;' });

    self.postMessage(URL.createObjectURL(csvBlob));
};
