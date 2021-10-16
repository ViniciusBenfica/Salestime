import { Router } from 'express'
import { getUsers, createUser, getUser, deleteUser, updateUser} from './controller/UserController'

const router = Router()

router.get("/getAllUSers", getUsers)
router.get("/getUser/:username", getUser)
router.post("/creatUser", createUser)
router.put("/updateUser/:username", updateUser)
router.delete("/deleteUser/:username", deleteUser)

export default router