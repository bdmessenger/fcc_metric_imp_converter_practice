/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      const input = req.query.input;
      const initNum = Number(convertHandler.getNum(input));
      const initUnit = convertHandler.getUnit(input);
      const unitInvalid = initUnit.match(/invalid/);
      const noUnit = initUnit.match(/no/);
    
      if(typeof(initNum) !== 'number' || !initNum) {
        if(unitInvalid) return res.status(400).json({error:'invalid number and unit'});
        return res.status(400).json({error:'invalid number'});
      } else if (unitInvalid) return res.status(400).json({error: 'invalid unit'});
      else if (noUnit) return res.status(400).json({error: 'no unit'});
      
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      //res.json
      res.json({initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: toString});
    });
    
};
