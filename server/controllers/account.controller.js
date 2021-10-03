const Account = require("../models/account.model");

const createAccount = async (req, res, next) => {
  try {
    const { creditAmount, name, nic, address, passportNo, password, email } = req.body;
    let account = new Account();
    account =  account.createAccount(
      creditAmount,
      name,
      nic,
      address,
      passportNo,
      password, email,
    );
    res.status(200).json({
      success: true,
      data: account,
    })
  } catch (e) {
    console.log(e);
  }
};

const createPayment = async (req, res, next) => {
  try {
    let account = new Account();
    await account.addCredit(req.body.amount, req.body.accountId);
    res.status(200).json({
      data: null,
      success: true,
    })
  } catch (e) {
    console.log(e)
  }
}

const getAccountInfo = async (req, res, next) => {
  try {
    let account = new Account()
    const data = await account.getAccountInfo(req.params.id);
    res.status(200).json({
      data,
      success: true,
    })
  } catch (e) {
    console.log(e)
  }
}

const getAllAccountInfo = async (req, res, next) => {
  try {
    let account = new Account()
    const data = await account.getAllAccountInfo();
    res.status(200).json({
      data,
      success: true,
    })
  } catch (e) {
    console.log(e)
  }
}

const accountLogin = async (req, res, next) => {
  try {
    const account = new Account();
    const data = await account.accountLogin(req.body.email, req.body.password);
    res.status(200).json({
      data,
      success: true,
    })
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  createAccount,
  createPayment,
  getAccountInfo,
  getAllAccountInfo,
  accountLogin,
};
