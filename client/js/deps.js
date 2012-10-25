kampfer.addDependency('app.js', ['mindMap.app'], ['mindMap.MapsManager','mindMap.MapManager','mindMap.MapController','JSON']);
kampfer.addDependency('base.js', [], []);
kampfer.addDependency('branch.js', ['mindMap.Branch'], ['mindMap.Component','style','events']);
kampfer.addDependency('caption.js', ['mindMap.Caption'], ['mindMap.Component','style','events']);
kampfer.addDependency('command.js', ['mindMap.command'], ['Class','events','mindMap.Node']);
kampfer.addDependency('component.js', ['mindMap.Component'], ['mindMap.Composition','style']);
kampfer.addDependency('composition.js', ['mindMap.Composition'], ['events.EventTarget']);
kampfer.addDependency('config.js', ['mindMap','mindMap.config'], []);
kampfer.addDependency('lib/data.js', ['dataManager'], ['browser.support']);
kampfer.addDependency('lib/dom.js', ['dom'], ['string']);
kampfer.addDependency('lib/events.js', ['events','events.Event'], ['dataManager']);
kampfer.addDependency('lib/eventtarget.js', ['events.EventTarget'], ['events','Class']);
kampfer.addDependency('lib/string.js', ['string'], []);
kampfer.addDependency('lib/style.js', ['style'], []);
kampfer.addDependency('lib/support.js', ['browser.support'], []);
kampfer.addDependency('lib/tools/class.js', ['Class'], []);
kampfer.addDependency('lib/tools/FileSaver.min.js', ['saveAs'], []);
kampfer.addDependency('lib/tools/json2.js', ['JSON'], []);
kampfer.addDependency('lib/tools/qunit.js', [], []);
kampfer.addDependency('lib/tools/store.min.js', ['store'], []);
kampfer.addDependency('lib/ui/layer.js', ['ui.Layer'], ['Class','dom','style','events']);
kampfer.addDependency('map.js', ['mindMap.Map'], ['events','mindMap.Component','mindMap.Node']);
kampfer.addDependency('mapController.js', ['mindMap.MapController'], ['Class','events','mindMap.Map','mindMap.Node','mindMap.Menu','mindMap.command']);
kampfer.addDependency('MapManager.js', ['mindMap.MapManager'], ['Class','store']);
kampfer.addDependency('MapsManager.js', ['mindMap.MapsManager'], ['Class','store']);
kampfer.addDependency('menu.js', ['mindMap.Menu','mindMap.MenuItem'], ['mindMap.Component','dom','events']);
kampfer.addDependency('menuController.js', ['mindMap.MenuController'], ['Class','events','mindMap.Menu','mindMap.commandManager']);
kampfer.addDependency('node.js', ['mindMap.Node'], ['style','events','dom','mindMap.Component','mindMap.Branch','mindMap.Caption']);
