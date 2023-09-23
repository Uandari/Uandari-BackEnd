import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { StatusCodes } from '../src/common/enums/enums';
import userRoutes from './routes/userRoutes';
import roleRoutes from './routes/roleRoutes';
import issueRoutes from './routes/issueRoutes';
import hourxhourRoutes from './routes/hourxhourRoutes';
import categoryRoutes from './routes/categoryRoutes';
import typeCategoryRoutes from './routes/typeCategoryRoutes';
import escalatedIssueRoutes from './routes/escalatedIssueRoutes';
import operationRoutes from './routes/operationRoutes';
import areasRoutes from './routes/areasRoutes';
import cellRoutes from './routes/cellRoutes';
import lineRoutes from './routes/lineRoutes';
import { Response } from 'express';
const app = express();
app.use(express.json());
const PORT = 4000; //change port if you want

dotenv.config();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// Routing
app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/hourxhour', hourxhourRoutes);
app.use('/api/issue', issueRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/typecategory', typeCategoryRoutes);
app.use('/api/escalatedissues', escalatedIssueRoutes);
app.use('/api/cells', cellRoutes);
app.use('/api/line', lineRoutes);
app.use('/api/operation', operationRoutes);
app.use('/api/areas', areasRoutes);

app.use((_req, res: Response) => {
  res.status(StatusCodes.SERVER_ERROR).json({
    status: StatusCodes.SERVER_ERROR,
    message: "Ruta no encontrada",
    payload: [],
  });
});

app.get('/ping', (_req, res: Response) => {
  res.send('pong');
});
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
