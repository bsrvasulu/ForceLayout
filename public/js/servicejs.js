function getSMEDetails() {
    var results = {'data':{'results':[{'columns':['s'],'data':[{'graph':{'nodes':[{'id':'5','labels':['SME'],'properties':{'contact':'XXX XXX 9999','name':'Joe','type':'SME'}}],'relationships':[]}}]}],'errors':[]},'status':200,'config':{'method':'GET','transformRequest':[null],'transformResponse':[null],'jsonpCallbackParam':'callback','url':'/api/hostApplication/support','headers':{'Accept':'application/json, text/plain, */*'},'params':{'appName':'nodejs'}},'statusText':'OK'};
    return results;
}

function getApplicationSupport() {
    var results = {'data':{'results':[{'columns':['s'],'data':[{'graph':{'nodes':[{'id':'5','labels':['SME'],'properties':{'contact':'XXX XXX 9999','name':'Joe','type':'SME'}}],'relationships':[]}}]}],'errors':[]},'status':200,'config':{'method':'GET','transformRequest':[null],'transformResponse':[null],'jsonpCallbackParam':'callback','url':'/api/hostApplication/support','headers':{'Accept':'application/json, text/plain, */*'},'params':{'appName':'Command Executor'}},'statusText':'OK'};
    return results;
}


function getHostApplicationsWithSME() {
    var results = {'data':{'results':[{'columns':['n','p','l','sm','s','a','q'],'data':[{'graph':{'nodes':[{'id':'0','labels':['site'],'properties':{'name':'FRC','description':'FRC','type':'site'}},{'id':'1','labels':['server'],'properties':{'os':'Linux','name':'Dev server','description':'Development Server','type':'server'}},{'id':'11','labels':['SME'],'properties':{'contact':'XXX-XXX-2222','name':'Mike'}}],'relationships':[{'id':'35','type':'SME','startNode':'1','endNode':'11','properties':{'description':'Subject Matter Expert','type':'SME'}},{'id':'5','type':'server','startNode':'0','endNode':'1','properties':{'description':'VM Server','type':'server'}}]}},{'graph':{'nodes':[{'id':'0','labels':['site'],'properties':{'name':'AZS','description':'Arizona Site','type':'site'}},{'id':'1','labels':['server'],'properties':{'os':'Linux','name':'devServer','description':'Development Server','type':'server'}},{'id':'4','labels':['application'],'properties':{'name':'Command Executor','description':'Command Center','type':'application'}},{'id':'5','labels':['SME'],'properties':{'contact':'XXX XXX 2222','name':'Sree','type':'SME'}}],'relationships':[{'id':'5','type':'server','startNode':'0','endNode':'1','properties':{'description':'VM Server','type':'server'}},{'id':'25','type':'application','startNode':'1','endNode':'4','properties':{'description':'Command Center relation','type':'application'}},{'id':'28','type':'SME','startNode':'4','endNode':'5','properties':{'description':'Subject Matter Expert','type':'SME'}}]}},{'graph':{'nodes':[{'id':'0','labels':['site'],'properties':{'name':'FRC','description':'FRC','type':'site'}},{'id':'2','labels':['server'],'properties':{'os':'Linux','name':'prodServer','description':'Production Server','type':'server'}},{'id':'11','labels':['SME'],'properties':{'contact':'XXX-XXX-2222','name':'Mike'}}],'relationships':[{'id':'34','type':'SME','startNode':'2','endNode':'11','properties':{'description':'Subject Matter Expert','type':'SME'}},{'id':'4','type':'server','startNode':'0','endNode':'2','properties':{'description':'VM Server','type':'server'}}]}},{'graph':{'nodes':[{'id':'0','labels':['site'],'properties':{'name':'FRC','description':'FRC','type':'site'}},{'id':'2','labels':['server'],'properties':{'os':'Linux','name':'prodServer','description':'Production Server','type':'server'}},{'id':'5','labels':['SME'],'properties':{'contact':'XXX XXX 2222','name':'Sree','type':'SME'}},{'id':'10','labels':['webserver'],'properties':{'name':'nodejs','description':'Node js server','type':'webserver'}}],'relationships':[{'id':'33','type':'webserver','startNode':'2','endNode':'10','properties':{'description':'Nodejs web server','type':'webserver'}},{'id':'4','type':'server','startNode':'0','endNode':'2','properties':{'description':'VM Server','type':'server'}},{'id':'37','type':'SME','startNode':'10','endNode':'5','properties':{'description':'Subject Matter Expert','type':'SME'}}]}},{'graph':{'nodes':[{'id':'0','labels':['site'],'properties':{'name':'FRC','description':'FRC','type':'site'}},{'id':'2','labels':['server'],'properties':{'os':'Linux','name':'prodServer','description':'Production Server','type':'server'}},{'id':'5','labels':['SME'],'properties':{'contact':'XXX XXX 2222','name':'Sree','type':'SME'}},{'id':'9','labels':['database'],'properties':{'name':'mongodb','description':'Mongo DB database','type':'database'}}],'relationships':[{'id':'4','type':'server','startNode':'0','endNode':'2','properties':{'description':'VM Server','type':'server'}},{'id':'36','type':'SME','startNode':'9','endNode':'5','properties':{'description':'Subject Matter Expert','type':'SME'}},{'id':'31','type':'database','startNode':'2','endNode':'9','properties':{'description':'Mongodb Database','type':'database'}}]}},{'graph':{'nodes':[{'id':'0','labels':['site'],'properties':{'name':'FRC','description':'FRC','type':'site'}},{'id':'2','labels':['server'],'properties':{'os':'Linux','name':'prodServer','description':'Production Server','type':'server'}},{'id':'8','labels':['application'],'properties':{'name':'reports','description':'Substrate WIP Reports','type':'application'}}],'relationships':[{'id':'4','type':'server','startNode':'0','endNode':'2','properties':{'description':'VM Server','type':'server'}},{'id':'30','type':'application','startNode':'2','endNode':'8','properties':{'description':'Substrate WIP Reports','type':'application'}}]}},{'graph':{'nodes':[{'id':'0','labels':['site'],'properties':{'name':'FRC','description':'FRC','type':'site'}},{'id':'2','labels':['server'],'properties':{'os':'Linux','name':'prodServer','description':'Production Server','type':'server'}},{'id':'7','labels':['application'],'properties':{'name':'Hosts Monitoring','description':'Host Monitoring','type':'application'}}],'relationships':[{'id':'4','type':'server','startNode':'0','endNode':'2','properties':{'description':'VM Server','type':'server'}},{'id':'29','type':'application','startNode':'2','endNode':'7','properties':{'description':'Host Monitoring relation','type':'application'}}]}},{'graph':{'nodes':[{'id':'0','labels':['site'],'properties':{'name':'FRC','description':'FRC','type':'site'}},{'id':'2','labels':['server'],'properties':{'os':'Linux','name':'prodServer','description':'Production Server','type':'server'}},{'id':'3','labels':['application'],'properties':{'name':'Apps Live Check','description':'Application Monitoring','type':'application'}},{'id':'6','labels':['SME'],'properties':{'contact':'XXX-XXX-1111','name':'Foo'}}],'relationships':[{'id':'4','type':'server','startNode':'0','endNode':'2','properties':{'description':'VM Server','type':'server'}},{'id':'24','type':'application','startNode':'2','endNode':'3','properties':{'description':'App Monitoring relation','type':'application'}},{'id':'27','type':'ASME','startNode':'3','endNode':'6','properties':{'description':'Subject Matter Expert','type':'ASME'}}]}},{'graph':{'nodes':[{'id':'0','labels':['site'],'properties':{'name':'FRC','description':'FRC','type':'site'}},{'id':'2','labels':['server'],'properties':{'os':'Linux','name':'prodServer','description':'Production Server','type':'server'}},{'id':'3','labels':['application'],'properties':{'name':'Apps Live Check','description':'Application Monitoring','type':'application'}},{'id':'5','labels':['SME'],'properties':{'contact':'XXX XXX 2222','name':'Sree','type':'SME'}}],'relationships':[{'id':'4','type':'server','startNode':'0','endNode':'2','properties':{'description':'VM Server','type':'server'}},{'id':'24','type':'application','startNode':'2','endNode':'3','properties':{'description':'App Monitoring relation','type':'application'}},{'id':'26','type':'SME','startNode':'3','endNode':'5','properties':{'description':'Subject Matter Expert','type':'SME'}}]}}]}],'errors':[]},'status':200,'config':{'method':'GET','transformRequest':[null],'transformResponse':[null],'jsonpCallbackParam':'callback','url':'/api/hostApplication/layoutWithSME','headers':{'Accept':'application/json, text/plain, */*'},'params':{'siteName':'FRC'}},'statusText':'OK'};
    return results;
}