import express from 'express';
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 2077;



app.get('/health',(req,res)=> {
    res.status(200).send("Full HP");
})

app.use((req,res)=>{
    console.log(`Welp, you bruv requested something I dont have, maybe try and hack me?`);
});

app.listen(PORT,()=> {
    console.log(`Server is ON and running on PORT: ${PORT}`);
});