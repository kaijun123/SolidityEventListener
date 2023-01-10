import { Model } from "sequelize";
import { ModelUtils } from "../utils/model";
import { sequelize } from "./index"

class Transfer extends Model { };

Transfer.init({
  ...ModelUtils.standardColumns,
  fromAddress: ModelUtils.genericString(true),
  toAddress: ModelUtils.genericString(true),
  amount: ModelUtils.genericString(true),
  transactionHash: ModelUtils.genericString(true),
  blockNumber: ModelUtils.number(true),
  eventData: ModelUtils.jsonType(true)

}, { modelName: "transfer", sequelize, freezeTableName: true })

export default Transfer;