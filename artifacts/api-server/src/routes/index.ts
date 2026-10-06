import { Router, type IRouter } from "express";
import analyticsRouter from "./analytics";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(analyticsRouter);

export default router;
