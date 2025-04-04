import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/User";

const authUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(401).json({ message: "Usuário e/ou senha inválido" });

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid)
      return res.status(401).json({ message: "Usuário e/ou senha inválido" });

    const token = jwt.sign(
      { 
        userId: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({
      token,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ocorreu um erro inesperado ao autenticar usuário" });
  }
};

export default authUser;
