import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { BorrowStables } from "../generated/schema"
import { BorrowStables as BorrowStablesEvent } from "../generated/JonesGlpVaultRouter/JonesGlpVaultRouter"
import { handleBorrowStables } from "../src/jones-glp-vault-router"
import { createBorrowStablesEvent } from "./jones-glp-vault-router-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _amountBorrowed = BigInt.fromI32(234)
    let newBorrowStablesEvent = createBorrowStablesEvent(_amountBorrowed)
    handleBorrowStables(newBorrowStablesEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BorrowStables created and stored", () => {
    assert.entityCount("BorrowStables", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BorrowStables",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_amountBorrowed",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
