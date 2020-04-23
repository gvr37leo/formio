var formdata = {
    "components": [
        {
            "label":"geslacht",
            "widget":"choicesjs",
            "tableView":true,
            "data":{
               "values":[
                  {
                     "label":"man",
                     "value":"man"
                  },
                  {
                     "label":"vrouw",
                     "value":"vrouw"
                  }
               ]
            },
            "selectThreshold":0.3,
            "calculateServer":false,
            "key":"select1",
            "type":"select",
            "indexeddb":{
               "filter":{
   
               }
            },
            "input":true,
            "attributes":{
                "id":"geslacht"
            }
         },
         {
            "label":"haarkleur",
            "spellcheck":true,
            "tableView":true,
            "calculateServer":false,
            "key":"textField",
            "type":"textfield",
            "input":true,
            "attributes":{
                "id":"haarkleur"
            },
            "customClass":"haarkleur"
         },
         {
            "label":"schoenmaat",
            "spellcheck":true,
            "tableView":true,
            "calculateServer":false,
            "key":"schoenmaat",
            "type":"textfield",
            "input":true,
            "attributes":{
                "id":"schoenmaat"
            }
         }
    ]
}

var formio = document.getElementById('formio')

var builder = new Formio.FormBuilder(document.getElementById('builder'), formdata, {})

var onBuild = function(build){
    // var res = JSON.stringify(builder.instance.schema,null,4)
    Formio.createForm(formio, builder.instance.schema).then(form => {
        // var buttons = this.formdata.components.filter(c => c.type == 'button' && c.attributes.id != null)
        //generate blocks for buttons
        form.data = {
            select1:'man'
        }
    })
}

builder.instance.ready.then(() => {
    // builder.instance.on('saveComponent', onBuild)
    // builder.instance.on('editComponent', onBuild)
    // builder.instance.on('updateComponent', onBuild)
    // builder.instance.on('deleteComponent', onBuild)
    builder.instance.onAny(onBuild)
    onBuild()
})
// ------------------------------------------------------------------------
//block definitions

//rawjavascript
Blockly.Blocks['rawjavascript'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput(""), "javascript");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};
Blockly.JavaScript['rawjavascript'] = function(block) {
    var text_javascript = block.getFieldValue('javascript');
    // TODO: Assemble JavaScript into code variable.
    var code = text_javascript;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

//fetch
Blockly.Blocks['fetch'] = {
    init: function() {
        this.appendValueInput("url")
            .setCheck("String")
            .appendField("url");
        this.appendDummyInput()
            .appendField("(data is returned in 'data' property)");
        this.appendStatementInput("onsucces")
            .setCheck(null)
            .appendField("on succes")
        this.appendStatementInput("onfail")
            .setCheck(null)
            .appendField("on fail");
        this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    }
};
Blockly.JavaScript['fetch'] = function(block) {
    var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_onsucces = Blockly.JavaScript.statementToCode(block, 'onsucces');
    var statements_onfail = Blockly.JavaScript.statementToCode(block, 'onfail');
    // TODO: Assemble JavaScript into code variable.
    var code = `fetch(${value_url},{
        method:'get',
    }).then(res => res.json())
    .then(data => {
        ${statements_onsucces}
    }).catch(e => {
        ${statements_onfail}
    }).then(() => {

    });\n`

    return code;
};



//buttonclick
Blockly.Blocks['buttonclickevent'] = {
    init: function() {
    this.appendDummyInput()
        .appendField("on button")
        .appendField(new Blockly.FieldTextInput("id"), "buttonid")
        .appendField(" click");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
        }
};
Blockly.JavaScript['buttonclickevent'] = function(block) {
    var text_buttonid = block.getFieldValue('buttonid');
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    
    var code = `formio.querySelector('#${text_buttonid}').addEventListener('click', () => {
    ${statements_name}
})`
    return code;
};

Blockly.Blocks['inputchangeevent'] = {
    init: function() {
    this.appendDummyInput()
        .appendField("on input")
        .appendField(new Blockly.FieldTextInput("id"), "inputid")
        .appendField(" change");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
        }
};
Blockly.JavaScript['inputchangeevent'] = function(block) {
    var text_inputid = block.getFieldValue('inputid');
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    
    var code = `formio.querySelector('#${text_inputid}').addEventListener('change', (event) => {
    ${statements_name}
})\n`
    return code;
};



//shake
Blockly.Blocks['shake'] = {
    init: function() {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("shake element with id");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['shake'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC).slice(1,-1);
        // TODO: Assemble JavaScript into code variable.
    
    var code = `$('#formio #${value_name}').effect("shake");\n`
    return code;
  };

//getfieldvalue
Blockly.Blocks['getfieldvalue'] = {
    init: function() {
      this.appendValueInput("ID")
          .setCheck("String")
          .appendField("get waarde van veld met id");
      this.setOutput(true, "String");
      this.setColour(230);
    }
  };

Blockly.JavaScript['getfieldvalue'] = function(block) {
    var value_id = Blockly.JavaScript.valueToCode(block, 'ID', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `formio.querySelector('#${value_id.slice(1,-1)}').value`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

//setfieldvalue
Blockly.Blocks['setfieldvalue'] = {
    init: function() {
        this.appendValueInput("id")
        .setCheck("String")
        .appendField("set field with id");
        this.appendValueInput("value")
            .setCheck("String")
            .appendField("to value");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
    }
  };

Blockly.JavaScript['setfieldvalue'] = function(block) {
    var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `formio.querySelector('#${value_id.slice(1,-1)}').value = ${value_value};\n`;
    return code;
};

//hide element
Blockly.Blocks['hideelement'] = {
    init: function() {
        this.appendValueInput("id")
            .setCheck("String")
            .appendField("hide element with id");
        this.setColour(230);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.JavaScript['hideelement'] = function(block) {
    var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `formio.querySelector('#${value_id.slice(1,-1)}').closest('.form-group').style.display = 'none';\n`;
    return code;
};

//show element
Blockly.Blocks['showelement'] = {
    init: function() {
        this.appendValueInput("id")
            .setCheck("String")
            .appendField("show element with id");
        this.setColour(230);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.JavaScript['showelement'] = function(block) {
    var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
    
    var code = `formio.querySelector('#${value_id.slice(1,-1)}').closest('.form-group').style.display = 'block';\n`;
    return code;
};

// ---------------------------------------------------------------------------------
//workspace and toolbox definition
var toolbox = document.getElementById("toolbox");

var options = {
    toolbox: toolbox,
    collapse: false,
    comments: false,
    disable: false,
    maxBlocks: Infinity,
    trashcan: false,
    horizontalLayout: false,
    toolboxPosition: 'start',
    css: true,
    media: 'https://blockly-demo.appspot.com/static/media/',
    rtl: false,
    scrollbars: false,
    sounds: true,
    oneBasedIndex: true
};

var workspace = Blockly.inject('blocklyDiv', options);

/* Load Workspace Blocks from XML to workspace. Remove all code below if no blocks to load */

var workspaceBlocks = document.getElementById("workspaceBlocks");

/* Load blocks to workspace. */
Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);




workspace.addChangeListener((e) => {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('codepreview').value = code;
});


document.getElementById('eval').addEventListener('click',() => {
    evalpreviewcode()
})

function evalpreviewcode(params) {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    eval(code)
}

document.getElementById('copyworkspacebutton').addEventListener('click',() => {
    console.log(Blockly.Xml.workspaceToDom(workspace).innerHTML)
})

