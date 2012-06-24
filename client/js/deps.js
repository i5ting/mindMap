kampfer.addDependency('app.js', [], ['mindMap.mapController']);
kampfer.addDependency('base.js', [], []);
kampfer.addDependency('branch.js', ['mindMap.Branch'], ['Class','dom','style','event']);
kampfer.addDependency('config.js', ['mindMap','mindMap.config'], []);
kampfer.addDependency('lib/data.js', ['dataManager'], ['browser.support']);
kampfer.addDependency('lib/dom.js', ['dom'], ['string']);
kampfer.addDependency('lib/event.js', ['event'], ['dataManager']);
kampfer.addDependency('lib/string.js', ['string'], []);
kampfer.addDependency('lib/style.js', ['style'], []);
kampfer.addDependency('lib/support.js', ['browser.support'], []);
kampfer.addDependency('lib/tools/class.js', ['Class'], []);
kampfer.addDependency('lib/tools/json2.js', ['JSON'], []);
kampfer.addDependency('lib/tools/qunit.js', [], []);
kampfer.addDependency('lib/ui/layer.js', ['ui.Layer'], ['Class','dom','style','event']);
kampfer.addDependency('map.js', ['mindMap.Map'], ['style','event','ui.Layer','mindMap.Node']);
kampfer.addDependency('mapController.js', ['mindMap.MapController'], ['Class','event','mindMap.Map','mindMap.Node']);
kampfer.addDependency('MapManager.js', ['mindMap.MapManager'], ['Class']);
kampfer.addDependency('MapsManager.js', ['mindMap.MapsManager'], ['Class']);
kampfer.addDependency('node.js', ['mindMap.Node'], ['style','event','ui.Layer','mindMap.Branch']);
