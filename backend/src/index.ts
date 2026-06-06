import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API del Catálogo de Productos corriendo' });
});

app.listen(PORT, () => {  
  console.log(` Servidor escuchando en el puerto: ${PORT}`);
});