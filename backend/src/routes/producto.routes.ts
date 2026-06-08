import { Router } from 'express';
import { crearProducto, modificarProducto, eliminarProducto, obtenerListado, obtenerProducto} from '../controllers/producto.controller';
const router = Router();

router.get('/listado', obtenerListado);
router.get('/producto', obtenerProducto);
router.post('/crear', crearProducto);
router.put('/modificar', modificarProducto);
router.delete('/eliminar', eliminarProducto);

export default router;