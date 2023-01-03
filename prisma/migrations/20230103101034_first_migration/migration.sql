-- CreateTable
CREATE TABLE "Owner" (
    "owner_uid" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "owned_car_uid" TEXT,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("owner_uid")
);

-- CreateTable
CREATE TABLE "Car" (
    "car_uid" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "model_year" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "car_owner_uid" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("car_uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_owned_car_uid_key" ON "Owner"("owned_car_uid");

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_owned_car_uid_fkey" FOREIGN KEY ("owned_car_uid") REFERENCES "Car"("car_uid") ON DELETE SET NULL ON UPDATE CASCADE;
