const Account = require("../models/account.model")

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

module.exports = {
  createAccount,
};
