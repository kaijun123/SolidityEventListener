import { Model } from "sequelize";
import { ModelUtils } from "../utils/model";
import { sequelize } from "./index"

class Approval extends Model { };

Approval.init({
  ...ModelUtils.standardColumns,
  contractAddress: ModelUtils.genericString(true),
  owner: ModelUtils.genericString(true),
  spender: ModelUtils.genericString(true),
  value: ModelUtils.genericString(true),

}, { modelName: "approval", sequelize, freezeTableName: true })

export default Approval;