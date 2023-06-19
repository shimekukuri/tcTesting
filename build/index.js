const textEncoderStream = new TransformStream({
    transform(chunk, controller) {
        console.log('[transform]', chunk);
        controller.enqueue(chunk);
    },
    flush(controller) {
        console.log('[flush]');
        controller.terminate();
    },
});
(async () => {
    const readStream = textEncoderStream.readable;
    const writeStream = textEncoderStream.writable;
    const range = [...Array(10).keys()];
    console.log(range);
    const writer = writeStream.getWriter();
    for (const num of range) {
        writer.write(num);
    }
    writer.close();
    const reader = readStream.getReader();
    for (let result = await reader.read(); !result.done; result = await reader.read()) {
        console.log('[value]', result.value);
    }
})();
export {};
