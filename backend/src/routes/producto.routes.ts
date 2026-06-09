import { Router } from 'express';
import { crearProducto, modificarProducto, eliminarProducto, obtenerListado, obtenerProducto} from '../controllers/producto.controller';
import { verificarToken } from '../middlewares/middleware';
const router = Router();

router.get('/listado', obtenerListado);
router.get('/producto', obtenerProducto);


router.post('/crear', verificarToken, crearProducto);
router.put('/modificar', verificarToken, modificarProducto);
router.delete('/eliminar', verificarToken, eliminarProducto);

export default router;