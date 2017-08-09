var a="";
var zForms=new Array();
				
if(window.tinyMCE){ 
	var url = tinyMCEPopup.getWindowArg("plugin_url");
}
				
				
function zf_submit()
{
	var perma_link = $("#permalink").val();
	if(perma_link.length==0)
	{
		$("#permaLinkError").attr("style","display:block");
		$("#permaLinkError").html("Please enter your form's public link.");
		$("#permaContainer").addClass("errorCont");
	}
	else
	{
		var permaLinkFormWidth = document.getElementById('iframeWidth');
		if(permaLinkFormWidth.value=="")
		{
			permaLinkFormWidth.value="100%";
		}
		var permaLinkFormHeight = document.getElementById('iframeHeight');
		if(permaLinkFormHeight.value=="")
		{
			permaLinkFormHeight.value="600px";
		}	
		insertContent(perma_link,permaLinkFormWidth.value,permaLinkFormHeight.value);
	}
}

function insertContent(src,width,height)
{
		
		var tag = '[zohoForms src=';
		tag += src;
		tag += ' width=';
		tag += width;
		tag += ' height=';
		tag += height;
		tag += '/]';		
		if(window.tinyMCE)
		{
			var tmce_ver=window.tinyMCE.majorVersion;
			if (tmce_ver>="4")
			{
				window.tinyMCE.execCommand('mceInsertContent', false, tag);
			}
			else
			{
				window.tinyMCE.execInstanceCommand('content', 'mceInsertContent', false, tag);
			}
			tinyMCEPopup.editor.execCommand('mceRepaint');
			tinyMCEPopup.close();
		}	
}

function closePopUp(){
	if(window.tinyMCE)
	{
		tinyMCEPopup.close();
	}
}
			
	
function getForms()
{
	if(a!="")
	{
		var len = a.forms.length;
		formList = document.getElementById("formname");
		for(i = 0; i < len;i++)
		{
			var option = document.createElement("option");
			option.text = a.forms[i].display_name;
			option.value = a.forms[i].link_name;
			formList.options.add(option);
			var formAndPerma = new Array();
			formAndPerma[0] = a.forms[i].link_name;
			formAndPerma[1] = a.forms[i].public_url;
			zForms[option.value] = formAndPerma;

		}
	}
					
}
				

function zforms_submit()
{
	var formName = $("#formname").val();
	if(formName == "-Select-")
	{		
		$("#formSelectionError").attr("style","display:block");		
		$("#formSelectionError").html("Please select a form.");
		$("#selctContainer").addClass("errorCont");
	}
	else
	{
		var formWidth = $('#width');
		if(formWidth.val()=="")
		{
			formWidth.val("100%");
		}
		var formHeight = $('#height');
		if(formHeight.val()=="")
		{
			formHeight.val("600px");
		}
		var urlBuild = zForms[formName][1];	
		insertContent(urlBuild,formWidth.val(),formHeight.val());
		
	}
}
				
			
function embedPerma()
{
	if($("#permaContainer").hasClass("errorCont"))
	{
		$("#permaContainer").removeClass("errorCont");
		$("#permaLinkError").attr("style","display:none");
	}
	$("#publicLink").addClass("selected");
	$("#permaLinkDiv").attr("style","display:block");
	$("#createFormDiv").attr("style","display:none");
	$("#chooseFormDiv").attr("style","display:none");
	$("#signinDiv").attr("style","display:none");
	$("#refreshDiv").attr("style","display:none");
	$("#selectForm").removeClass("selected");
	
}
		
function signin()
{				
	if(window.tinyMCE)
	{
		window.open("https://www.zoho.com/forms/login.html");
		$("#refreshDiv").attr("style","display:block");
		$("#signinDiv").attr("style","display:none");
	}				
}
function appendScript()
{
	var scriptToAppend = document.createElement("script");
	scriptToAppend.type = "text/javascript";
	scriptToAppend.id="api";
	scriptToAppend.src = url+"/dynamicScript.js";
	document.getElementsByTagName("head")[0].appendChild(scriptToAppend);
}
function chooseForm()
{
	if(!$("#api").length||a=="")
	{
		appendScript();
	}
	else
	{
		selectForm();
	}
}

function hideError()
{
	if($("#selctContainer").hasClass("errorCont"))
	{
		$("#selctContainer").removeClass("errorCont");
		$("#formSelectionError").attr("style","display:none");
	}
	if($("#permaContainer").hasClass("errorCont"))
	{
		$("#permaContainer").removeClass("errorCont");
		$("#permaLinkError").attr("style","display:none");
	}
}

function selectForm()
{
	$("#selectForm").addClass("selected");
	if($("#selctContainer").hasClass("errorCont"))
	{
		$("#selctContainer").removeClass("errorCont");
		$("#formSelectionError").attr("style","display:none");
	}
		
	if(a!="")
	{
		if(a.forms.length==0)
		{
			$("#createFormDiv").attr("style","display:block");;
			$("#chooseFormDiv").attr("style","display:none");
			$("#signinDiv").attr("style","display:none");
		}
		else
		{
			$("#chooseFormDiv").attr("style","display:block");
			$("#signinDiv").attr("style","display:none");
		}	
	}
	else
	{		
		$("#signinDiv").attr("style","display:block");			
	}
	$("#permaLinkDiv").attr("style","display:none");
	$("#refreshDiv").attr("style","display:none");
	$("#publicLink").attr("class","none");
}
		
function refresh()
{
	
	if($("#api").length)
	{
		$("#api").remove();
	}
	chooseForm();
}

function createForm()
{
	window.open("https://forms.zoho.com/");	
	$("#refreshDiv").attr("style","display:block");	
	$("#createFormDiv").attr("style","display:none");
	$("#signinDiv").attr("style","display:none");
}


