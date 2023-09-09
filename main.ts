import express from 'express';
import 'dotenv/config'

const app = express();
const PORT = 2077;

app.listen(PORT,()=> {
    console.log(`Server is ON and running on PORT: ${PORT}`);
});