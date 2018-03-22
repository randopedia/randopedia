import express from 'express';

const app = express();

app.listen(8080, () => {
    console.log('Server started!'); // eslint-disable-line no-console
});

export default app;