import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import clienteRoutes from './routes/cliente.routes'
import transaccionesRoutes from './routes/transacciones.routes'
import suscripcionesRoutes from './routes/suscripciones.routes'
import fondos from './routes/fondos.routes'

const app = express();
app.use(cors());
app.use(express.json());


// Route configuration
// Example:
// import apiRoutes from './routes/api.routes';
// app.use('/api', apiRoutes);

app.use('/clientes', clienteRoutes );
app.use('/transacciones', transaccionesRoutes);
app.use("/fondos", fondos);
app.use('/suscripciones', suscripcionesRoutes );

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: 'Not found'
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

export default app;