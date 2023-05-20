import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Car } from "../utils/prismaClient";

// GET ALL CARS
const getAllCars = async (req: Request, res: Response) => {
  const foundCars = await Car.findMany();

  if (foundCars.length < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: "Could not find any cars,please try again later or create one yourself!",
      cars: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: "Successfully found cars!",
    nbHits: foundCars.length,
    cars: foundCars,
  });
};

// GET SINGLE CAR BY UID
const getCarByUID = async (req: Request, res: Response) => {
  const { carUID } = req.params;

  if (carUID === ":carUID") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a carUID!", car: {} });
  }

  const foundCar = await Car.findUnique({ where: { car_uid: carUID } });

  if (!foundCar) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Could not find car with the UID:${carUID}...`, car: {} });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found car with UID:${carUID}...`,
    car: foundCar,
  });
};

// CREATE CAR
const createCar = async (req: Request, res: Response) => {
  const carBody = req.body;

  const createdCar = await Car.create({ data: { ...carBody } });

  if (!createdCar) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not create car,please enter a valid request body!",
      car: {},
    });
  }

  return res.status(StatusCodes.CREATED).json({
    msg: `Successfully created car with UID:${createdCar.car_uid}`,
    car: createdCar,
  });
};

// UPDATE CAR
const updateCar = async (req: Request, res: Response) => {
  const { carUID } = req.params;
  const carBody = req.body;

  if (carUID === ":carUID") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a carUID!", car: {} });
  }

  const foundCar = await Car.findUnique({ where: { car_uid: carUID } });

  if (!foundCar) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find a car with the uid: ${carUID}!`,
      owner: {},
    });
  }

  const updatedCar = await Car.update({
    where: { car_uid: carUID },
    data: { ...carBody },
  });

  if (!updatedCar) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Could not update car with UID:${carUID}...`, car: {} });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated car with UID:${carUID}`,
    car: updatedCar,
  });
};

// DELETE CAR
const deleteCar = async (req: Request, res: Response) => {
  const { carUID } = req.params;

  if (carUID === ":carUID") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a carUID!", car: {} });
  }

  const foundCar = await Car.findUnique({ where: { car_uid: carUID } });

  if (!foundCar) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any cars with the id provided(${carUID})!`,
      car: {},
    });
  }
  const deletedCar = await Car.delete({ where: { car_uid: carUID } });

  if (!deletedCar) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: `Could not delete car.`,
      car: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted car with UID:${carUID}...`,
    car: deletedCar,
  });
};

// EXPORTS

export { getAllCars, getCarByUID, createCar, updateCar, deleteCar };
