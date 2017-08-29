'use strict';

console.log('Loading function');
const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();


var pos = 0;
var deals = [];
var dealNum = 0;
function peekstr(ins, cur, til){
	return ins.substring(cur, ins.indexOf(til, cur) + 1);
}

function putRes(err, data) {
  if (err) {
    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
    console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
}}

function getTagContent(ins, cur, tag){
    var closeTag = "</" + tag.substring(1, tag.length);   
    return (ins.substring(cur + tag.length, ins.indexOf(closeTag, cur + tag.length))).replace(/&/g, "&amp;");
}

exports.handler = (event, context, callback) => {
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    switch (event.httpMethod) {
        case 'DELETE':
            break;
        case 'GET':
            break;
        case 'POST':
            break;
        case 'PUT':
            var inputString = JSON.parse(event.body);
            console.log(inputString);
            for(pos = 0; pos < inputString.length; pos++){
            	if(inputString[pos] == '<'){
                    var node = peekstr(inputString, pos, ">");   
                                    console.log(node);
                    switch(node){
                        //url
                        //image
                        //price
                        //dealid
                        //description
                        //startdate
                        //enddate
                        //oldprice
                        //departureairports
                        //states
                        case "<deal>":
                              deals.push([]);
                              pos += 5;        
                            break;
                        case "</deal>":
                              dealNum++;
                              pos += 6;
                            break;      
                        case "<title>":
                            deals[dealNum]['displayTitle'] = getTagContent(inputString, pos, "<title>");
                            deals[dealNum]['title'] = deals[dealNum]['displayTitle'].replace(/\s/g, "-").replace(/[^-\w]/g, "").toLowerCase();
                            pos += 11 + deals[dealNum]['displayTitle'].length
                            break;    
                        case "<url>":
                            deals[dealNum]['url'] = getTagContent(inputString, pos, "<url>");
                            pos += 9 + deals[dealNum]['url'].length;
                            break;    
                        case "<image>":
                            deals[dealNum]['image'] = "http://cheapseat.club/img/" + new Buffer(getTagContent(inputString, pos, "<image>")).toString("base64");
                            pos += 6 + 7 + deals[dealNum]['image'].length;
                            break;    
                        case "<price>":
                            deals[dealNum]['price'] = getTagContent(inputString, pos, "<price>");
                            pos += 6 + 7 + deals[dealNum]['price'].length;
                            break;
                        case "<dealid>":
                            deals[dealNum]['dealid'] = getTagContent(inputString, pos, "<dealid>");
                            pos += 7 + 8 + deals[dealNum]['dealid'].length;
                            break;
                        case "<description>":
                            deals[dealNum]['description'] = getTagContent(inputString, pos, "<description>");
                            pos += 11 + 12 + deals[dealNum]['description'].length;
                            break;
                        case "<startdate>":
                            deals[dealNum]['startdate'] = getTagContent(inputString, pos, "<startdate>");
                            pos += 10 + 11 + deals[dealNum]['startdate'].length;
                            break;
                        case "<enddate>":
                            deals[dealNum]['enddate'] = getTagContent(inputString, pos, "<enddate>");
                            pos += 8 + 9 + deals[dealNum]['enddate'].length;
                            break;
                        case "<oldprice>":
                            deals[dealNum]['oldprice'] = getTagContent(inputString, pos, "<oldprice>");
                            pos += 9 + 10 + deals[dealNum]['oldprice'].length;
                            break;
                        case "<departureairports>":
                            deals[dealNum]['departureairports'] = getTagContent(inputString, pos, "<departureairports>");
                            pos += 18 + 19 + deals[dealNum]['departureairports'].length;
                            break;
                        case "<states>":
                            deals[dealNum]['states'] = getTagContent(inputString, pos, "<states>");
                            pos += 7 + 8 + deals[dealNum]['states'].length;
                            break;
                        default:
                            break;
                    }
                }
            }
            if(deals.length === 0){
                break;
            }
            console.log(deals.length);
            for(var i = 0; i < deals.length; i++){
                var title = deals[i]['title'];
                
                var params = {
                    TableName:"Deals",
                    Key:{
                        "title": title
                    },
                        UpdateExpression: "set displayTitle = :d",
                        ExpressionAttributeValues:{
                        ":d": deals[i]['displayTitle']
                    },
                    ReturnValues:"UPDATED_NEW"
                };
                dynamo.updateItem(params, putRes);
            }
            done();
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
    done(200, "end of the line")
};
