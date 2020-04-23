
Blockly.Blocks['findelement'] = {
    init: function() {
      this.appendValueInput("classname")
          .setCheck("String")
          .appendField("find element with class");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['findelement'] = function(block) {
    var value_classname = Blockly.JavaScript.valueToCode(block, 'classname', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `$('.${value_classname.slice(1,-1)}')`;
    
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

//---------------------------------------------------------

  Blockly.Blocks['methodcall'] = {
    init: function() {
      this.appendValueInput("object")
          .setCheck(null)
          .appendField("object");
      this.appendValueInput("method")
          .setCheck(null)
          .appendField(".");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['methodcall'] = function(block) {
    var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
    var value_method = Blockly.JavaScript.valueToCode(block, 'method', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `${value_object}.${value_method};\n`;
    return code;
  };


//---------------------------------------------------------------

Blockly.Blocks['getelement'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get element")
        .appendField(new Blockly.FieldDropdown(() => {
            return formdata.components.filter(comp => comp.attributes.id != null).map(comp => {
                return [comp.label,comp.attributes.id]
            })
        }), "element");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['getelement'] = function(block) {
  var dropdown_element = block.getFieldValue('element');

  var code = `formio.querySelector('#${dropdown_element}')`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};