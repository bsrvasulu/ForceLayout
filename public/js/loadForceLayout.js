var selectedNode = {name: ''};
var json = {'results':[{'columns':['n','p','l','s','a'],'data':[{'graph':{'nodes':[{'id':'0','labels':['site'],'properties':{'name':'AZS','description':'FRC','type':'site'}},{'id':'1','labels':['server'],'properties':{'os':'Linux','name':'devServer','description':'Development Server','type':'server'}},{'id':'4','labels':['application'],'properties':{'name':'Command Executor','description':'Command Center','type':'application'}}],'relationships':[{'id':'5','type':'server','startNode':'0','endNode':'1','properties':{'description':'VM Server','type':'server'}},{'id':'25','type':'application','startNode':'1','endNode':'4','properties':{'description':'Command Center relation','type':'application'}}]}},{'graph':{'nodes':[{'id':'0','labels':['site'],'properties':{'name':'FRC','description':'FRC','type':'site'}},{'id':'2','labels':['server'],'properties':{'os':'Linux','name':'prodServer','description':'Production Server','type':'server'}},{'id':'10','labels':['webserver'],'properties':{'name':'nodejs','description':'Node js server','type':'webserver'}}],'relationships':[{'id':'33','type':'webserver','startNode':'2','endNode':'10','properties':{'description':'Nodejs web server','type':'webserver'}},{'id':'4','type':'server','startNode':'0','endNode':'2','properties':{'description':'VM Server','type':'server'}}]}},{'graph':{'nodes':[{'id':'0','labels':['site'],'properties':{'name':'FRC','description':'FRC','type':'site'}},{'id':'2','labels':['server'],'properties':{'os':'Linux','name':'prodServer','description':'Production Server','type':'server'}},{'id':'9','labels':['database'],'properties':{'name':'mongodb','description':'Mongo DB database','type':'database'}}],'relationships':[{'id':'4','type':'server','startNode':'0','endNode':'2','properties':{'description':'VM Server','type':'server'}},{'id':'31','type':'database','startNode':'2','endNode':'9','properties':{'description':'Mongodb Database','type':'database'}}]}},{'graph':{'nodes':[{'id':'0','labels':['site'],'properties':{'name':'FRC','description':'FRC','type':'site'}},{'id':'2','labels':['server'],'properties':{'os':'Linux','name':'prodServer','description':'Production Server','type':'server'}},{'id':'8','labels':['application'],'properties':{'name':'Advance Reports','description':'Substrate WIP Advance Reports','type':'application'}}],'relationships':[{'id':'4','type':'server','startNode':'0','endNode':'2','properties':{'description':'VM Server','type':'server'}},{'id':'30','type':'application','startNode':'2','endNode':'8','properties':{'description':'Substrate WIP Advance Reports','type':'application'}}]}},{'graph':{'nodes':[{'id':'0','labels':['site'],'properties':{'name':'FRC','description':'FRC','type':'site'}},{'id':'2','labels':['server'],'properties':{'os':'Linux','name':'prodServer','description':'Production Server','type':'server'}},{'id':'7','labels':['application'],'properties':{'name':'Hosts Health Monitor','description':'Host Monitoring','type':'application'}}],'relationships':[{'id':'4','type':'server','startNode':'0','endNode':'2','properties':{'description':'VM Server','type':'server'}},{'id':'29','type':'application','startNode':'2','endNode':'7','properties':{'description':'Host Monitoring relation','type':'application'}}]}},{'graph':{'nodes':[{'id':'0','labels':['site'],'properties':{'name':'FRC','description':'FRC','type':'site'}},{'id':'2','labels':['server'],'properties':{'os':'Linux','name':'prodServer','description':'Production Server','type':'server'}},{'id':'3','labels':['application'],'properties':{'name':'Application Monitor','description':'Application Monitoring','type':'application'}}],'relationships':[{'id':'4','type':'server','startNode':'0','endNode':'2','properties':{'description':'VM Server','type':'server'}},{'id':'24','type':'application','startNode':'2','endNode':'3','properties':{'description':'App Monitoring relation','type':'application'}}]}}]}],'errors':[]};

var force = null;
var layoutRoot = null;
var tcWhite = '#FFFFFF';
var nodes = [];
var links = [];
// rest of vars
var w = 960,
    h = 560,
    maxNodeSize = 50,
    x_browser = 20,
    y_browser = 25;
var vis;
var node;


function updateNodeData(d){
    selectedNode.name = d.properties.name;
    selectedNode.type = d.properties.type;
    selectedNode.description = d.properties.description;
    selectedNode.SMEs = [];
    getApplicationSupport(d.properties.name)
        .then(function (result) {
            //Success
            console.log(JSON.stringify(result));
            var neo4jJson = result.data;
            neo4jJson.results[0].data.forEach(function (row) {
                row.graph.nodes.forEach(function (n) {
                    n.labels.forEach(function (l){
                        if('SME' === l){
                            var SMEInfo=  {};
                            SMEInfo.SME = n.properties.name;
                            SMEInfo.SMEContact = n.properties.contact;
                            selectedNode.SMEs.push(SMEInfo);
                        }
                    });
                });
            });
        }, function (err) {
            console.log(JSON.stringify(err));
        });
}

function update() {
    console.log('links: ' + JSON.stringify(links));
    //Restart the force layout.
    force.nodes(nodes)
        .links(links)
        .gravity(0.05)
        .charge(-2500)
        .linkDistance(200)
        .friction(0.5)
        .linkStrength(function(l, i) {return 1; })
        .size([w, h])
        .on('tick', tick)
        .start();
    var drag = force.drag()
        .on('dragstart', dragstart);

    // build the arrow.
    var arrows = vis.selectAll('marker')
        .data(['end'])      // Different link/path types can be defined here
        .enter().append('svg:marker')    // This section adds in the arrows
        .attr('id', 'arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 29)
        .attr('refY', -1.6)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .attr('fill', '#949494')
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5');


    var path = vis.selectAll('path.link')
        .data(force.links());
    //.data(links, function(d) { return d.target.id; });

    var pathEnter = path.enter().insert('svg:path')
        .attr('class', 'link')
        .attr('marker-end', 'url(#end)')
        .attr('id', function(d,i) {return 'edgepath'+i})
        .style('stroke', '#949494')
        .attr('marker-end', 'url(#arrow)');

    path.exit().remove();

    var edgelabels = vis.selectAll('.edgelabel')
        .data(links)
        .enter()
        .append('text')
        .style('pointer-events', 'none')
        .attr({'class':'edgelabel',
            'id':function(d,i){return 'edgelabel'+i},
            'dx':function(d){return 80; },//d.dx/2 + 15; },//80},
            'dy':0,
            'font-size':11,
            'fill':'blue'});

    edgelabels.append('textPath')
        .attr('xlink:href',function(d,i) {return '#edgepath'+i})
        .style('pointer-events', 'none')
        //.text(function(d,i){return 'label '+i});
        .text(function(d,i){return d.target.properties.type});

    //Update the nodes…
    node = vis.selectAll('g.node')
        .data(nodes, function(d) { return d.id; });

    // Enter any new nodes.
    nodeEnter = node.enter().append('svg:g')
        .attr('class', 'node')
        .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
        .on('dblclick', click)
        .on('click', updateNodeData)
        .call(force.drag);

    var nodeCircles2 = nodeEnter.append('svg:circle')
            .attr('r', function(d) {  if(!(('SME' === d.properties.type) ||('ASME' === d.properties.type))) return Math.sqrt(d.size) / 10 + 3 || 25 + 3;
                return 0;})
            .style('fill', 'white')
            .style('stroke', 'lightBlue')
            .style('stroke-width', '4px')
            .attr('class', 'ring')
        //.style('display', 'none')
    ;


    // Append a circle
    var nodeCircles = nodeEnter.append('svg:circle')
        .attr('r', function(d) { if(!(('SME' === d.properties.type) ||('ASME' === d.properties.type))) return Math.sqrt(d.size) / 10 || 25;
            return 0;})
        //.style('fill', '#6DCE9E')
        .style('fill', function(d){if('site' === d.properties.type) return '#FFD86E';
        else if('server' === d.properties.type) return '#DE9BF9';
        else if('database' === d.properties.type) return '#8C8C8C';
        else if('webserver' === d.properties.type) return '#FB95AF';
            return '#6DCE9E'; })
        .style('stroke', function(d){if('site' === d.properties.type) return '#EAC36D';
        else if('server' === d.properties.type) return '#C584E0';
        else if('database' === d.properties.type) return '#6F6F6F';
        else if('webserver' === d.properties.type) return '#E0849B';
            return '#2AB53C'; })
        //.style('stroke', '#2AB53C')
        .style('stroke-width', '1px');

    // Append images
    var images = nodeEnter.append('svg:rect')
    //.attr('xlink:href',  function(d) { return d.img;})
        .attr('x', function(d) { return -25;})
        .attr('y', function(d) { return -25;})
        .attr('height', function(d) { if(('SME' === d.properties.type) ||(('ASME' === d.properties.type))) return 35;
            return 0;})
        .attr('width', function(d) { if(('SME' === d.properties.type) ||(('ASME' === d.properties.type))) return 45;
            return 0;})
        .style('fill', 'rgba(255, 117, 110, 1.0)');

    // make the image grow a little on mouse over and add the text details on click
    var setEvents = images
    // Append hero text
        .on('click', function (d) {
            //updateNodeData(d);
            //d3.select('h1').html(d.hero);
            //d3.select('h2').html(d.name);
            //d3.select('h3').html ('Take me to ' + '<a href='' + d.link + '' >'  + d.hero + ' web page ⇢'+ '</a>' );
        });


    var textCodeCircle = nodeEnter.append('text')
    //.attr('class', 'nodetext')
    //.attr('dx', -15)
        .attr('dx', function(d) {  if(!(('SME' === d.properties.type) ||('ASME' === d.properties.type))) return -15;
        else return -20; })
        .attr('dy', function(d) {  if(!(('SME' === d.properties.type) ||('ASME' === d.properties.type))) return 5;
        else return -5; })
        //.attr('dy', 5)
        .attr('fill', tcWhite)
        .attr('font-size', 9)
        .text(function(d) {  if(!(('SME' === d.properties.type) ||('ASME' === d.properties.type))) return (d.properties.name.substr(0, 5)+'...');
        else
        if(d.properties.name.length > 5) return (d.properties.name.substr(0, 5)+'...');
        else return d.properties.name; });


    // Append hero name on roll over next to the node as well
    nodeEnter.append('text')
        .attr('class', 'nodetext')
        .attr('x', x_browser)
        .attr('y', y_browser -5)
        .attr('font-size', 11)
        .attr('fill', '#75157A')
        .text(function(d) { return d.properties.name; });
    // Exit any old nodes.
    node.exit().remove();
    // Re-select for update.
    path = vis.selectAll('path.link');
    node = vis.selectAll('g.node');
    function tick() {
        //alert('tick');
        path.attr('d', function(d) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            return   'M' + d.source.x + ','
                + d.source.y
                + 'A' + dr + ','
                + dr + ' 0 0,1 '
                + d.target.x + ','
                + d.target.y;
        });

        node.attr('transform', nodeTransform);
    }
}

function clearNodes() {
    nodes = {};
    links = [];
    force.start();
    d3.timer(force.resume);
    update();
}
function getSourceNode(n, id) {
    for (var i=0;i<n.length;i++) {
        if (n[i].id == id){
            if((n[i]._id === undefined) || (n[i]._id === null))
                return n[i];
        } }
    return null;
}

function idIndex(a,id) {
    for (var i=0;i<a.length;i++) {
        if (a[i].id == id) return i;}
    return null;
}

function getNode(n, id) {
    for (var i=0;i<n.length;i++) {
        if (n[i].id == id){
            return n[i];
        } }
    return null;
}

function flatten(root) {
    var nodes = [];
    var i = 0;

    function recurse(node) {
        if (node.children)
            node.children.forEach(recurse);
        if (!node.id)
            node.id = ++i;
        nodes.push(node);
    }

    recurse(root);
    return nodes;
}

function isLinkExist(allLinks, currLink){
    var bReturn = false;
    allLinks.forEach(function(row){
        console.log('row.source.id:' + row.source.id + ' - row.target.id:' + row.target.id  );
        console.log('currLink.source.id:' + currLink.source.id + ' - currLink.target.id:' + currLink.target.id  );
        if((row.source.id == currLink.source.id) && (row.target.id == currLink.target.id))
            bReturn = true;
    });
    return bReturn;
}

function buildNodesAndLinks(neo4jJson){
    var nodes=[], links=[];
    //var nodeRelationShip= true;
    neo4jJson.results[0].data.forEach(function (row) {
        var nodeRelationShip= true;
        row.graph.nodes.forEach(function (n) {
            if (((n._id === undefined) ||(n._id === null)) &&(nodeRelationShip === true)){
                //if (idIndex(nodes,n.id) == null)
                //n.children = [];
                nodes.push(n);
            } else{
                if(nodeRelationShip === true) {
                    nodes.push(n);
                    nodeRelationShip = false;
                }
            }
        });

        var relationShip= true;
        row.graph.relationships.forEach(function (r) {
            var link = {};
            link.source = getSourceNode(nodes, r.startNode);
            if ((null !== link.source) && (relationShip === true)) {
                link.source.children = [];
                link.target = getNode(nodes, r.endNode);
                if((null !== link.target) && (relationShip === true)) {
                    link.target.properties.type = r.type;
                    var bLinkExist = isLinkExist(links, link);
                    console.log('link.source.id:' + link.source.id + ' - link.target.id:' + link.target.id  + ' -bLinkExist:' + bLinkExist );
                    //alert('test');
                    if(bLinkExist !== true)
                        links.push(link);
                }
                else{
                    relationShip = false;
                }
            }
            else{
                relationShip = false;
            }
        });
    });
    //alert('test2');
    return {nodes: nodes, links: links};
}

function drawForceLayout(){
    //,
    //root;
    force = d3.layout.force();

    vis = d3.select('#vis').append('div')
        .classed('svg-container', true)
        .append('svg')
        //.attr('viewBox', '0 0 600 400')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', '0 0 ' + w + ' ' + h )
        .classed('svg-content-responsive', true);
    //.attr('width', w).attr('height', h);

    layoutRoot = json;
    layoutRoot.fixed = true;
    layoutRoot.x = w / 2;
    layoutRoot.y = h / 4;

    treeStructureObj = buildNodesAndLinks(layoutRoot);

    nodes = treeStructureObj.nodes;
    links = treeStructureObj.links;

    // Build the path
    var defs = vis.insert('svg:defs')
        .data(['end']);
    update();
}

    /**
     *
     */


    /**
     * Gives the coordinates of the border for keeping the nodes inside a frame
     * http://bl.ocks.org/mbostock/1129492
     */
function nodeTransform(d) {
    //d.x =  Math.max(maxNodeSize, Math.min(w - (d.imgwidth/2 || 16), d.x));
    //d.y =  Math.max(maxNodeSize, Math.min(h - (d.imgheight/2 || 16), d.y));
    d.x =  Math.max(maxNodeSize, Math.min(w - (d.imgwidth/2 || 16), d.x));
    d.y =  Math.max(maxNodeSize, Math.min(h - (d.imgheight/2 || 16), d.y));
    return 'translate(' + d.x + ',' + d.y + ')';
}

    /**
     * Toggle children on click.
     */
function click(d) {
    //Manipulate layoutRoot
    layoutRoot.results[0].data.forEach(function (row) {
        row.graph.nodes.forEach(function (n) {
            if(((n._id === undefined) ||(n._id === null)) && (n.id === d.id)){
                n._id = n.id;
                //n.id = null;
            }
            else if(n.id === d.id){
                n._id = null;
            }
        });
    });

    //node.remove();
    clearNodes();
    treeStructureObj = buildNodesAndLinks(layoutRoot);

    nodes = treeStructureObj.nodes;
    links = treeStructureObj.links;

    update();
    //drawForceLayout();
}

    /**
     * Returns a list of all nodes under the root.
     */

function dragstart(d) {
    d3.select(this).classed('fixed', d.fixed = true);
}

function getHostApplicationWithSME2(siteName) {
    loadingHostApplication = true;
    //$scope.hostInventoryCollection.splice(0, $scope.hostInventoryCollection.length);
    var resultData = getHostApplicationsWithSME(siteName);
    //Success
    console.log(JSON.stringify(resultData));
    json = resultData.data;
    loadingHostInventory = false;

    layoutRoot = json;
    layoutRoot.fixed = true;
    layoutRoot.x = w / 2;
    layoutRoot.y = h / 4;

    treeStructureObj = buildNodesAndLinks(layoutRoot);

    nodes = treeStructureObj.nodes;
    links = treeStructureObj.links;
    update();

}

function loadForceLayout(){
    drawForceLayout();
}

function getSMELinks() {
    clearNodes();
    getHostApplicationWithSME2();
}

    // $timeout(function () {
    //     $scope.drawForceLayout();
    // }, 200);
//}