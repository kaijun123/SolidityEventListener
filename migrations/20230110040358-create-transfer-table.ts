"use strict";

import { QueryInterface } from "sequelize";
import { ModelUtils } from "../src/utils/model";

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    // your migration here
    console.log("creating transfer table");
    await queryInterface.createTable('transfer', {
      ...ModelUtils.standardColumns,
      fromAddress: ModelUtils.genericString(true),
      toAddress: ModelUtils.genericString(true),
      amount: ModelUtils.genericString(true),
      transactionHash: ModelUtils.genericString(true),
      blockNumber: ModelUtils.number(true),
      eventData: ModelUtils.jsonType(true)
    }, { transaction });
  })
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    // reverse the above
    queryInterface.dropTable("transfer");
  })
};
