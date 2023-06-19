const readableStream = new ReadableStream({
    start(controller) {
        // Called by constructor.
        console.log('[start readable]');
        const range = [...Array(15).keys()];
        for (let num of range) {
            console.log(num);
            controller.enqueue(num);
        }
    },
    cancel(reason) {
        // Called when the stream is canceled.
        console.log('[cancel]', reason);
    },
});
const transformStream1 = new TransformStream({
    transform(chunk, controller) {
        console.log('[transform 1]', chunk);
        controller.enqueue(chunk * 2);
    },
    flush(controller) {
        console.log('[flush 1]');
    },
});
const transformStream2 = new TransformStream({
    transform(chunk, controller) {
        console.log('[transform 2]', chunk);
        controller.enqueue(chunk * 4);
    },
    flush(controller) {
        console.log('[flush 2]');
    },
});
const transformStream3 = new TransformStream({
    transform(chunk, controller) {
        console.log('[transform 3]', chunk);
        if (chunk >= 100) {
            console.log('fired');
            controller.enqueue(chunk);
        }
    },
    flush(controller) {
        console.log('[flush 3]');
    },
});
await readableStream
    .pipeThrough(transformStream1)
    .pipeThrough(transformStream2)
    .pipeThrough(transformStream3);
console.log('[finished]');
export {};
