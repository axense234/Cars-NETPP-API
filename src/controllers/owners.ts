import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Owner } from "../utils/prismaClient";

// GET ALL OWNERS
const getAllOwners = async (req: Request, res: Response) => {
  const foundOwners = await Owner.findMany();

  if (foundOwners.length < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: "Could not find any car owners,please try again later!",
      owners: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: "Successfully found car owners!",
    nbHits: foundOwners.length,
    owners: foundOwners,
  });
};

// GET OWNER BY UID
const getOwnerByUID = async (req: Request, res: Response) => {
  const { ownerUID } = req.params;

  if (ownerUID === ":ownerUID") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a owner UID!", owner: {} });
  }

  const foundOwner = await Owner.findUnique({
    where: {
      owner_uid: ownerUID,
    },
  });

  if (!foundOwner) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find an owner with the UID:${ownerUID}!`,
      owner: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfulyl found owner with UID:${ownerUID}...`,
    owner: foundOwner,
  });
};

// UPDATE OWNER BY UID
const updateOwnerByUID = async (req: Request, res: Response) => {
  const { ownerUID } = req.params;
  const ownerBody = req.body;

  if (ownerUID === ":ownerUID") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a owner UID!", owner: {} });
  }

  const foundOwner = await Owner.findUnique({ where: { owner_uid: ownerUID } });

  if (!foundOwner) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Could not find owner with uid:${ownerUID}!`, owner: {} });
  }

  const updatedOwner = await Owner.update({
    where: { owner_uid: ownerUID },
    data: { ...ownerBody },
  });

  if (!updatedOwner) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: `Could not update owner with uid:${ownerUID}!`,
      owner: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated owner with UID:${ownerUID}`,
    owner: updatedOwner,
  });
};

// DELETE OWNER BY UID
const deleteOwnerByUID = async (req: Request, res: Response) => {
  const { ownerUID } = req.params;

  if (ownerUID === ":ownerUID") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a owner UID!", owner: {} });
  }

  const foundOwner = await Owner.findUnique({ where: { owner_uid: ownerUID } });
  if (!foundOwner) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({
        msg: `Could not find any owners with the id: ${ownerUID}.`,
        owner: {},
      });
  }

  const deletedOwner = await Owner.delete({ where: { owner_uid: ownerUID } });

  if (!deletedOwner) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: `Something went wrong, please try again later.`,
      owner: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted owner with UID:${ownerUID}`,
    owner: deletedOwner,
  });
};

// EXPORTS
export { getAllOwners, getOwnerByUID, updateOwnerByUID, deleteOwnerByUID };
