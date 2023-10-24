import express from 'express'
import cors from 'cors';
import rootRoute from './routes/rootRoutes.js'
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(".")) // định vị lại đường dẫn để load tài nguyên ở BE

app.listen(8080);


app.use('/api',rootRoute)