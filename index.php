<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <title>WE Demain</title>
        
        <!--Pour la carte-->
        <script type="text/javascript" src="d3-js/topojson.v1.min.js"></script>
        <script type="text/javascript" src="d3-js/datamaps.world.min.js"></script>
        
        <script type="text/javascript" src="js/jquery-1.10.2.js"></script>
        <script type="text/javascript" src="js/jquery-ui-1.10.4.custom.min.js"></script>
        
        <!-- Pour detecter les &eacute;l&eacute;ments dans le viewport et lancer l'animation au bon moment -->
        <script type="text/javascript" src="d3-js/jquery.viewport.js"></script>
        
        <!-- Librairie D3 -->
        <script type="text/javascript" src="d3-js/d3.min.js"></script>
        
        <!-- Pour le travelling avant -->
        <script src="zoomcomic-js/modernizr.js"></script>
        <script src="zoomcomic-js/main.js"></script>
        
        <!-- Pour le scroll horiz -->
        <script src="horiz-js/jquery.mousewheel.js"></script>
        <script src="horiz-js/scroll.js"></script>
        
        <!---- Pour le tooltip --->
        <link rel="stylesheet" type="text/css" href="css/tooltipster.css" />
        <script src="js/jquery.tooltipster.js"></script>
        <script>
            $(document).ready(function() {
                //debut de l'astuce pour masquer la scroll bar horizontale tout le temps
                $('.tooltip.tooltip-hide-scroll').tooltipster({
                    theme: 'tooltipster-hide-scroll',
                    autoClose: false
                });
                $('#tooltip-hide-scroll').tooltipster('show');
                //fin de l'astuce pour masquer la scroll bar horizontal tout le temps
                $('.tooltip.tooltip-percentage').tooltipster({maxWidth:200,position:'bottom',iconDesktop:true,iconTouch:true});
                $('.tooltip.tooltip-top').tooltipster({maxWidth:200,position:'top'});
                $('.tooltip').tooltipster({maxWidth:200,position:'bottom',iconDesktop:true,iconTouch:true});
            });
        </script>
        
        <!--Pour le style-->    
        <link href="css/main.css" media="all" rel="stylesheet" type="text/css" />
        <link href="css/style.css" media="all" rel="stylesheet" type="text/css" />
        
    </head>
    <body>
        
        <div id="titre" class="intro-outro">
            <div class="strut"></div>
            <div id="titre-post" class="post">
                <img id="factureenergetique" src="img/factureenergetique.png" />
                <div id="liencliquez" onclick="leverTitre();">
                    <h4 class="navigation-help" id="navigation-help1"><?php echo _("CLIQUEZ POUR COMMENCER VOTRE VOYAGE");?></h4>
                    <p>
                        <img src="img/chevron-bas.png" />
                    </p>
                </div>
            </div>
        </div>
        
        <div id="conclusion" class="intro-outro" style="display: none">
            <div class="strut"></div>
            <div class="post">
                <div id="recommandez">
                    <img style="width: 500px" src="img/recommandez.png"/>
                </div>
                <div id="conclu-partage">
                    <a href="https://twitter.com/share?url=http%3A%2F%2Ffabienrichard.fr/projects/wedemain" target="_blank">
                        <img id="twt" class="image" src="img/twitter.png" />
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Ffabienrichard.fr/projects/wedemain" target="_blank">
                        <img id="fb" class="image" src="img/facebook.png" />						
                    </a>
                </div>
                <div id="wea">
                    <p><span style="font-size: 1.3em;"><?php echo _("MESUREZ LA CONSOMMATION");?></span><br/><span><?php echo _("DE VOS SITES PR&Eacute;F&Eacute;R&Eacute;S SUR");?></span></p>
                    <p><a href="http://www.webenergyarchive.com" target="_blank" style="color:#FFD34E;font-size: 1.5em;">WEA</a></p>
                </div>
                <div id="credits">
                    <div id="credits-partenaires">
                        <h4 class="credit-title"><?php echo _("PARTENAIRES");?></h4>
                        <ul>
                            <li><a href="http://www.wedemain.fr" target="_blank">We Demain</a></li>
                            <li><a href="http://www.greencodelab.fr" target="_blank">Green Code Lab</a></li>
                            <li><a href="http://www.open-odyssey.org" target="_blank">Open Odyssey</a></li>
                        </ul>
                    </div>
                    <div id="credits-journalisme">
                        <h4 class="credit-title"><?php echo _("JOURNALISME");?></h4>
                        <ul>
                            <li>Claire Vayer</li>
                            <li>Hugo Pasco</li>
                            <li>Robin Schönfeld</li>
                        </ul>
                    </div>
                    <div id="credits-graphisme">
                        <h4 class="credit-title"><?php echo _("GRAPHISME");?></h4>
                        <ul>
                            <li>Axel Bizon</li>
                            <li>Philippine Morin</li>
                            <li>Simon Legeard</li>
                        </ul>
                    </div>
                    <div id="credits-developpement">
                        <h4 class="credit-title"><?php echo _("D&Eacute;VELOPPEMENT");?></h4>
                        <ul>
                            <li><a href="http://fabienrichard.fr" target="_blank">Fabien Richard</a></li>
                            <li>Valentin Lhommeau</li>
                            <li>Kostandin Tahiri</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="bandeau">
                <div id="bandeau-partenaires">
                    <a href="http://www.wedemain.fr" target="_blank">
                        <img id="wedemain" class="partenaires" src="img/bandeau/WeDemain.jpg" alt="We Demain" />	            	
                    </a>            	
                    <a href="http://www.ouestmedialab.fr" target="_blank">
                        <img id="ouestmedialab" class="partenaires" src="img/bandeau/OuestMedialab.jpg" alt="Ouest M&eacute;dialab" />	            	
                    </a>            	
                    <a href="http://www.agrnantes.fr" target="_blank">
                        <img id="agr" class="partenaires" src="img/bandeau/AGR.jpg" alt="AGR, L'&eacute;cole de l'image" />	            	
                    </a>            	
                    <a href="http://www.polytech-nantes.fr" target="_blank">
                        <img id="polytech" class="partenaires" src="img/bandeau/Polytech.jpg" alt="Polytech Nantes">	            	
                    </a>            	
                    <a href="http://www.sciencescom.org" target="_blank">
                        <img id="sciencescom" class="partenaires" src="img/bandeau/SciencesCom.jpg" alt="SciencesCom">	            	
                    </a>            	
                    <a href="http://www.orange.fr" target="_blank">
                        <img id="orange" class="partenaires" src="img/bandeau/Orange.jpg" alt="Orange">	            	
                    </a>
                    <a href="http://paysdelaloire.fr" target="_blank">
                        <img id="paysdelaloire" class="partenaires" src="img/bandeau/PaysdelaLoire.jpg" alt="R&eacute;gion Pays de la Loire">	            	
                    </a>
                    <a href="http://www.univ-nantes.fr" target="_blank">
                        <img id="univnantes" class="partenaires" src="img/bandeau/UnivNantes.jpg" alt="Universit&eacute; de Nantes">	            	
                    </a>
                </div>
                
                <div id="bandeau-commons">
                    <a href="http://creativecommons.org" target="_blank">
                        <img id="creativecommons" class="commons" src="img/bandeau/CreativeCommons.jpg" alt="Creative Commons">	            	
                    </a>
                    <a href="http://opensource.org" target="_blank">
                        <img id="opensource" class="commons" src="img/bandeau/OpenSource.jpg" alt="Open source initiative">	            	
                    </a>
                    <a href="http://www.etalab.gouv.fr" target="_blank">
                        <img id="etalab" class="commons" src="img/bandeau/Etalab.jpg" alt="Etalab gouv">	            	
                    </a>
                    <a href="http://www.webenergyarchive.com" target="_blank">
                        <img id="wea-logo" class="commons" src="img/bandeau/WEA.jpg" alt="WEA">	            	
                    </a>
                    <a href="http://www.open-odyssey.org" target="_blank">
                        <img id="oo-logo" class="commons" src="img/bandeau/OpenOdyssey.png" alt="Open Odyssey">	            	
                    </a>
                    <a href="http://www.greencodelab.fr" target="_blank">
                        <img id="gcl-logo" class="commons" src="img/bandeau/GreenCodeLab.png" alt="Green Code Lab">	            	
                    </a>
                </div>
                
                <div id="bandeau-hyblab">
                    <h3 id="projet"><?php echo _("un projet issu des ateliers du");?></h3>
                    <a href="http://hyblab.fr" target="_blank">
                        <img id="hyblab" src="img/bandeau/HybLab.jpg" alt="HybLab">	            	
                    </a>
                </div>
            </div>
        </div>
        
        
        <div id="travelling">
            <div id="wrap">
                <div id="container" style="margin-top: 10%;">
                    <div id="title">
                        <p id="old-browser">
                            <?php echo _("Exp&eacute;rimentez pleinement ce voyage avec un navigateur plus r&eacute;cent");?>
                        </p>
                        <div id="environment">
                            <div id="content">
                                <section>
                                    <p><img src="img/last.png" alt="" /></p>
                                </section>
                                <section>
                                    <p><img src="img/last.png" alt="" /></p>
                                </section>
                                <section onclick="scrollZoomInOrOut($('#pn-intro1'),$('#pn-conclu'));">
                                    <p><img src="img/nuages1.png" alt="nuage" /></p>
                                </section>
                                <section onclick="scrollZoomInOrOut($('#pn-intro2'),$('#pn-conclu'));">
                                    <p><img src="img/nuages2.png" alt="nuage" /></p>
                                </section>
                                <section onclick="scrollZoomInOrOut($('#pn-intro2'),$('#pn-conclu3'));">
                                    <p><img src="img/nuages3.png" alt="nuage" /></p>
                                </section>
                                <section onclick="scrollZoomInOrOut($('#pn-intro2'),$('#pn-conclu3'));">
                                    <p><img src="img/quartier.png" alt="quartier"/></p>
                                </section>
                                <section onclick="scrollZoomInOrOut($('#pn-presentation'),$('#pn-conclu2'));">
                                    <p><img  src="img/fenetre.png" alt="fenetre"/></p>
                                </section>
                                <section onclick="scrollZoomInOrOut($('#pn-presentation'),$('#pn-conclu2'));">
                                    <p><img src="img/mecdedos.png" alt="homme sur oridnateur" /></p>
                                </section>
                                <section onclick="scrollZoomInOrOut($('#pn-presentation'),$('#pn-conclu1'));">
                                    <p>
                                        <img style="z-index: 2;position: absolute" src="img/chutelibre.png" alt="" />
                                        <img id="spirale-img" src="img/spirale.png" />
                                    </p>
                                </section>
                                <section>
                                    <p><img src="img/last.png" /></p>
                                </section>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>	
        </div>
            
        <div id="navigation-help2" class="navigation-help">
            <h4><?php echo _("DEFILEZ OU CLIQUEZ SUR LA PAGE POUR AVANCER");?></h4>
        </div>
        
        <div id="navigation-help3" class="navigation-help">
            <h4><?php echo _("DEFILEZ OU CLIQUEZ SUR LA PAGE POUR RECULER");?></h4>
        </div>
        
        <div class="infobulle left" id="intro1">
            <div class="infobulle-content-left">
                <p><?php echo _("AVEZ VOUS ID&Eacute;E DE TOUTE<br/>L'&Eacute;NERGIE ENGLOUTIE<br/><span class='highlight'>CHAQUE JOUR</span> PAR INTERNET ?");?></p>
            </div>
        </div>
        <div class="infobulle right" id="intro2">
            <div class="infobulle-content-right">
                <p><?php echo _("L'INFORMATION QUE<br/>VOUS RECEVEZ VOYAGE.<br/><span class='highlight'>UN CLIC, UN TOUR DU MONDE");?></span></p>
            </div>
        </div>
        <div class="infobulle right" id="conclu1">
            <div class="infobulle-content-right">
                <p><?php echo _("<span  class='highlight'>40 MILLIONS</span><br/>D'INTERNAUTES SE<br/>CONNECTENT CHAQUE<br/>JOUR EN FRANCE");?></p>
            </div>
        </div>
        <div class="infobulle left" id="conclu2">
            <div class="infobulle-content-left">
                <p><?php echo _("LA MULTIPLICATION DES<br/>&Eacute;CRANS <span class='highlight'>AUGMENTE</span> LA<br/>D&Eacute;PENSE &Eacute;NERG&Eacute;TIQUE");?></p>
            </div>
        </div>
        <div class="infobulle right" id="conclu3">
            <div class="infobulle-content-right">
                <p><?php echo _("COMMENT CONSOMMERA<br/>T-ON DANS <span class='highlight'>20 ANS ?");?></span></p>
            </div>
        </div>
        
        <div id="bouton-continuer" onclick="activateHorizontalScroll();">
            <a style="font-size: 1.2em;" class="revenir-continuer"><?php echo _("CONTINUER");?> <img src="img/chevron-droit.png" /></a>
        </div>
        
        <div id="bouton-retour" onclick="activateHorizontalScroll();">
            <a style="font-size: 1.2em;" class="revenir-continuer"><img src="img/chevron-gauche.png" /> <?php echo _("REVENIR");?></a>
        </div>
        
        <div id="horizontal" style="display:none;">
            
            <div id="pre-presentation" class="transition horizontal-limit">
                <div class="strut"></div>
                <div class="post">
                    <a class="revenir-continuer" onclick="activateTravelling(true);"><img src="img/chevron-gauche.png" /> <?php echo _("REVENIR");?></a>
                </div>
            </div>
            
            <div id="presentation" class="transition" >
                <div class="strut"></div>
                <div class="post">
                    <img id="pres" src="img/presentation.png" />
                    <h2 id="ptqd"><?php echo _("QUAND VOUS AFFICHEZ UNE PAGE WEB, DE L'&Eacute;NERGIE<br/>
                        EST CONSOMM&Eacute;E, ET TOUTES LES PAGES NE SE VALENT PAS.");?></h2>
                    <h2 id="ptctn"><?php echo _("Certaines sont plus charg&eacute;es, plus lourdes, plus riches, plus &eacute;nergivores");?></h2>
                    <img id="ptpm" src="img/petitmotif.png" />
                    <h3 id="ptzoom"><?php echo _("ZOOM SUR 3 SITES");?></h3>
                    <div id="logos">
                        <div id="lm" class="ptlogos"><img src="img/lemonde.png" /><h4 class="ptnoms">LE MONDE</h4></div>
                        <div id="dm" class="ptlogos"><img id="marmiton" src="img/marmiton.png" /><h4 class="ptnoms">MARMITON</h4></div>
                        <div id="lbc" class="ptlogos"><img src="img/leboncoin.png" /><h4 class="ptnoms">LEBONCOIN</h4></div>
                    </div>
                    <h5 id="ptdon"><?php echo _("Donn&eacute;es r&eacute;colt&eacute;es par Green Code Lab sur");?> <a style="text-decoration: underline;" href="http://www.webenergyarchive.com/" target="_blank"> Web Energy Archive</a></h5>
                    <div id="tooltip-hide-scroll" class="tooltip tooltip-hide-scroll" title=""></div>
                </div>
            </div>
            
            
            
            <div class="arrow-container dark">
                <div class="strut"></div>
                <div class="post no-left-margin">
                    <div class="arrow"></div>
                </div>
            </div>
            
            <div id="section1" class="section">
                
                <div class="strut"></div>
                <div class="post">
                    
                    <h2 class="section-title">
                        <?php echo _("R&eacute;partition de la consommation &eacute;nerg&eacute;tique d'une page Web");?>
                    </h2>
                        
                    <h3 class="section-sub-title"><?php echo _("Une page Web, c'est des informations qu'il faut stocker,<br/>faire voyager et afficher. Et cela consomme de l'&eacute;nergie.");?></h3>
                    
                    <div class="chart" id="section1-chartConsommation" style="min-width: 500px; min-height: 230px;"></div>
                    <div class="limit" id="section1-chart-limit" style="height:30px;"></div>
                    <div style="margin-left: 125px;margin-top: -35px;">
                        <div id="tolltip-percentage" class="tooltip tooltip-percentage" title="<?php echo _("Moyenne calcul&eacute;e &agrave; partir de la consommation des sites LEMONDE, MARMITON et LEBONCOIN");?>"></div>
                    </div>
                        
                    <div id="section1-categoryList">
                        <a id="section1-category0" class="website category0 category tooltip selected" title="<?php echo _("Des serveurs situ&eacute;s partout dans le monde h&eacute;bergent les donn&eacute;es des pages Web");?>"><img src="img/serveur.png"/> STOCKAGE</a>
                        <a style="margin-left:35px;" id="section1-category1" class="website category category1 tooltip" title="<?php echo _("Les donn&eacute;es stock&eacute;es sur les serveurs voyagent jusqu'&agrave; votre ordinateur");?>"><img src="img/transfert.png"/> VOYAGE DES DONN&Eacute;ES</a>
                        <a style="margin-left:35px;" id="section1-category2" class="website category category2 tooltip" title="<?php echo _("Votre ordinateur affiche les donn&eacute;es r&eacute;cup&eacute;r&eacute;es sur des serveurs");?>"><img src="img/ordinateur.png"/> AFFICHAGE</a>
                    </div>
                    
                </div>
                
            </div>
            
            <div id="transition2" class="transition">
                <div class="strut"></div>
                <div class="post">
                    <p class="transition-texte">
                        <img id="monde-transition" src="img/monde.png"/><br/>
                        <span style="font-size: 1.3em;vertical-align: top;">LE </span><span style="font-size: 2.5em;line-height: 39px;"> TOUR </span><span style="font-size: 1.3em;">DU</span><br/>
                        <span style="font-size: 3.1em;">MONDE</span><br/>
                        <span style="font-size: 1.5em;">EN</span><br/>
                        <span style="color: white;font-size: 9em;line-height: 120px;">80</span><br/>
                        <span style="font-size: 3em;">CLICS</span><br/>
                        <span style="color: white;font-size: 1.2em;">(OU MOINS)</span>
                    </p>
                </div>
            </div>
            
            <div class="arrow-container">
                <div class="strut"></div>
                <div class="post no-left-margin">
                    <div class="arrow"></div>
                </div>
            </div>
            
            <div id="section2" class="section" >
                
                <div class="strut"></div>
                <div class="post">
                    
                    <h2 class="section-title">
                        <?php echo _("D'o&ugrave; vient l'information ?");?>
                    </h2>
                        
                    <h3 class="section-sub-title"><?php echo _("Les informations des sites que vous consultez sont stock&eacute;es aux 4 coins du monde.");?></h3>
                        
                    <div class="limit" id="section2-map-limit" style="height:30px;"></div>
                    <!--Les dimensions du conteneur doivent être en pixels pour que la carte d'affiche correctement-->
                    <div id="section2-map" style="position:relative;display: inline-block; width: 800px; height:500px"></div>
                    <div id="section2-websiteList">
                        <ul id="section2-websiteUl">
                            <li id="section2-websiteLi1" data-url="data/section2-lemonde.csv" data-index="0" distance="1221235"><span class="website site0 tooltip selected" title="<?php echo _("Pour vous permette de partager des articles, LEMONDE contacte les serveurs de Facebook");?>">LEMONDE</span></li>
                            <li id="section2-websiteLi2" data-url="data/section2-marmiton.csv" data-index="1" distance="299161"><span class="website site1 tooltip" title="<?php echo _("MARMITON se connecte aux serveurs de Youtube pour vous proposer des recettes en vid&eacute;os");?>">MARMITON</span></li>
                            <li id="section2-websiteLi3" data-url="data/section2-leboncoin.csv" data-index="2" distance="24691"><span class="website site2 tooltip" title="<?php echo _("Tous les serveurs de LEBONCOIN sont en France");?>">LEBONCOIN</span></li>
                        </ul>
                    </div>
                    
                    <div id="section2-data-distance">
                        <div id="section2-data-distance-texte1">
                            <h5>
                                <span style="font-size: 1.3em;vertical-align: top"><?php echo _("L'INFORMATION DOIT PARCOURIR");?> </span>
                                <span style="font-size: 2.7em;color:#F2D24C;line-height: 40px;" id="section2-distance"></span>
                                <span style="color:#F2D24C;font-size: 1.3em;">KM</span><span style="font-size: 1.3em;"> <?php echo _("AVANT ARRIVER &Agrave; VOTRE ORDINATEUR");?></span>
                            </h5>
                        </div>
                    </div>
                        
                    <div id="section2-data-terre-lune">
                        <div id="section2-data-terre-lune-texte1">
                            <h5>
                                <span style="font-size: 1.3em;"><?php echo _("SOIT");?></span>
                                <span style="font-size: 3.5em;color:#A93721;line-height: 40px;" id="section2-terre-lune"></span>
                                <span style="font-size: 1.3em"> <span style="color:#A93721;"><?php echo _("FOIS");?></span> <?php echo _("LE TOUR DE LA TERRE");?></span>
                            </h5>
                        </div>
                    </div>
                        
                </div>
            </div>
                
            <div id="transition3" class="transition">
                <div class="strut"></div>
                <div class="post">
                    <h2 class="transition-texte"><span style="font-size: 1.6em;"><?php echo _("L'ODYSS&Eacute;E");?></span><br/>
                        <span style="font-size: 1.4em;"><?php echo _("DE L'OCTET");?></span></h2>
                </div>
            </div>
                
            <div class="arrow-container">
                <div class="strut"></div>
                <div class="post no-left-margin">
                    <div class="arrow"></div>
                </div>
            </div>
                
            <div id="section3" class="section" >
                
                <div class="strut"></div>
                <div class="post">
                    <h2 class="section-title">
                        <?php echo _("Quantit&eacute; de donn&eacute;es t&eacute;l&eacute;charg&eacute;es");?>
                    </h2>
                        
                    <h3 class="section-sub-title"><?php echo _("Plus un site est volumineux, plus sa consultation est &eacute;nergivore.");?></h3>
                    
                    <div id="section3-charts">
                        
                        <div class="section3-data-container">
                            
                            <div id="section3-bar-chart-container"><div class="chart" id="section3-bar-chart" style="min-height:150px;"></div></div>
                            <div class="limit" id="section3-bar-chart-limit" style="height:30px;"></div>
                        </div>
                        
                    </div>
                    
                    <div id="section3-data">
                        
                        <div class="section3-data-container">
                            <span style="font-size: 3em;color: #CAC09C;" id="section3-dataQuantiteDonnees"></span>
                            <span style="font-size: 2em;color: #CAC09C;" id="section3-bar-chart-unit" class="section3-data">Mo</span>
                            <span style="font-size: 2em;" id="section3-bar-chart-usb-text"><?php echo _("SOIT");?></span>
                            <span style="font-size: 5em;color: #F2D24C;" id="section3-bar-chart-usb-number"></span>
                            <span id="section3-bar-chart-usb-unit"><img style="height: 55px;"  class="tooltip tooltip-top" title="<?php echo _("Cl&eacute; USB de 1Go");?>" src="img/cleusb.png"/></span>
                            <h2><?php echo _("Pour 10 000 pages affich&eacute;es");?></h2>
                        </div>
                        
                    </div>
                        
                    <div id="section3-websiteList">
                        
                        <ul id="section3-webisteUl">
                            
                        </ul>
                        
                    </div>
                    
                </div>
            </div>
                
            <div id="transition3bis" class="transition">
                <div class="strut"></div>
                <div class="post">
                    <h2 class="transition-texte"><span style="font-size: 1.4em;"><?php echo _("LE VOLUME");?></span><br/>
                        <span style="font-size: 1em;"><?php echo _("N'EST PAS LE SEUL");?></span></br>
                        <span style="font-size: 1.5em;"><?php echo _("RESPONSABLE");?></span></h2>
                </div>
            </div>
                
            <div class="arrow-container">
                <div class="strut"></div>
                <div class="post no-left-margin">
                    <div class="arrow"></div>
                </div>
            </div>
            
            <div id="section3bis" class="section" >
                
                <div class="strut"></div>
                <div class="post">
                    <h2 class="section-title">
                        <?php echo _("Consommation de l'ordinateur");?>
                    </h2>
                        
                    <h3 class="section-sub-title"><?php echo _("Un site bien pens&eacute; peut r&eacute;duire la facture d'&eacute;lectricit&eacute;.");?></h3>
                    
                    <div id="section3bis-charts">
                        
                        <div class="section3-data-container">
                            
                            <div class="chart" id="section3-sunburst-chart" style="min-height:150px;min-width: 150px;"></div>
                            <div class="limit" id="section3-sunburst-chart-limit" style="height:30px;"></div>
                        </div>
                        
                    </div>
                    
                        <div id="section3bis-data">
                        
                        <div class="section3-data-container" id="section3bis-data-container-lower">
                            <div style="font-size: 3em;color: #F2D24C;" id="section3-dataConsommation"></div>
                            <div style="font-size: 2em;color: #F2D24C;" id="section3-bar-chart-unit" class="section3-data">Wh</div>
                            <span style="font-size: 2em;" id="section3-bar-chart-ampoule-text"><?php echo _("SOIT");?></span>
                            <span style="font-size: 5em;color: #A93721;" id="section3-bar-chart-ampoule-number"></span>
                            <span id="section3-bar-chart-ampoule-unit"><img style="height: 55px;"  class="tooltip tooltip-top" title="<?php echo _("Ampoule de 60W");?>" src="img/ampoule.png"/></span>
                        </div>
                            
                        <div id="section3-dataAmpoules-lower">
                            <span style="font-size: 1.5em;"><?php echo _("ALLUM&Eacute;ES PENDANT");?> </span><span style="font-size: 2.5em;">1H</span>
                        </div>
                            
                        <div style="margin-top: 35px;">
                            <h2><?php echo _("Pour 10 000 pages affich&eacute;es");?></h2>
                        </div>
                        
                    </div>
                        
                    <div id="section3bis-websiteList">
                        
                        <ul id="section3bis-webisteUl">
                            
                        </ul>
                        
                    </div>
                        
                    
                </div>
            </div>
            
            <div id="section4" class="section" >
                
                <div class="strut"></div>
                    <div class="post">
                    
                    <div id="section4-websiteList">
                        
                        <ul id="section4-webisteUl" class="websiteUlNoTooltip">
                        </ul>
                        
                    </div>
                    
                    <div id="section4-chartConsommation">
                        
                        <div style="font-size: 2.5em" id="section4-selectedWebsite"></div>
                        <div id="section4-dataConsommation">
                            <div style="font-size: 2.5em;color: #F2D24C;" id="section4-valeurConsommation"></div><div style="font-size: 2em;color: #F2D24C;"> Wh</div>
                        </div>
                        <div id="section4-dataAmpoules" style="margin-top: -30px;">
                            <div style="font-size: 2.5em" ><a><?php echo _("SOIT");?> </a></div><div style="font-size: 5em;color: #A93721;" id="section4-nombreAmpoules"></div><div id="ampouleImg"><img style="height: 70px;" class="tooltip tooltip-top" title="<?php echo _("Ampoule de 60W");?>" src="img/ampoule.png"/></div>
                        </div>
                        <div id="section4-dataAmpoules-lower" style="margin-top: -80px;">
                            <span style="font-size: 1.3em;vertical-align: super;"><?php echo _("ALLUM&Eacute;ES PENDANT");?> </span><span style="font-size: 3em;margin-left: 10px;">1H</span>
                        </div>
                        <h4 style="margin-top: 40px;"><?php echo _("Pour 10 000 pages affich&eacute;es");?></h4>
                    </div>
                    
                </div>
            </div>
            
            <div id="transition5" class="transition">
                <div class="strut"></div>
                <div class="post">
                    <div class="transition-texte" id="transition5-wrapper">
                        <p style="font-size: 1.2em; color: white;"><?php echo _("D&Eacute;PENSE &Eacute;NERG&Eacute;TIQUE,");?>,<br/><?php echo _("VOYAGE EN 1 CLIC,");?><br/><?php echo _("LOURDEUR NUM&Eacute;RIQUE");?></p>
                        <img style="width: 40px;" src="img/petitmotif.png"/>
                        <p>
                            <span style="font-size: 1.2em;"><?php echo _("LE WEB A UN IMPACT REEL");?></span><br/>
                            <span style="font-size: 3em; color: white;">&</span><br/>
                            <span style="font-size: 1.4em; color: white;"><?php echo _("PAS SEULEMENT");?></span><br/>
                            <span style="font-size: 2em;"><?php echo _("VIRTUEL !");?></span>
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="arrow-container">
                <div class="strut"></div>
                <div class="post no-left-margin">
                    <div class="arrow"></div>
                </div>
            </div>
            
            <div id="section5" class="section" >
                
                <div class="strut"></div>
                <div class="post">
                    
                    <h2 class="section-title">
                        <?php echo _("Consommation &agrave; grande &eacute;chelle");?>
                    </h2>
                    
                    <div id="section5-image-list">
                        <ul id="section5-image-Ul">
                            <li class="image left"><img src="img/logo-personne.png"/></li>
                            <li><img src="img/logo-quartier.png"/></li>
                            <li class="image right"><img src="img/logo-ville.png"/></li>
                        </ul>
                    </div>
                    
                    <div id="section5-place-list">
                        <ul id="section5-place-Ul">
                            
                        </ul>
                    </div>
                    <div id="section5-data-left">
                        <div id="pourunan" style="vertical-align: top;">
                            <div><span style="font-size: 1.5em;"><?php echo _("POUR 1 AN");?></span></div>
                            <div><span style="font-size: 1.5em;"><?php echo _("DE NAVIGATION");?></span></div>
                        </div>
                        <div id="section5-data-values">
                            <span style="font-size: 2em;color: #F2D24C;line-height: 40px;float: left;" id="section5-dataConsommation-number"></span>
                            <span style="font-size: 1.5em;color: #F2D24C;float: left;">Wh</span>
                        </div>
                    </div>
                    <div id="section5-data-right-container">
                        <div id="section5-data-right">
                            <span style="font-size: 2.5em;"><?php echo _("SOIT");?></span>
                            <span style="font-size: 4.5em;color: #A93721;" id="section5-dataAmpoules-number"></span>
                            <span style="font-size: 1.5em;"><img  class="tooltip tooltip-top" title="<?php echo _("Ampoule de 60W");?>" src="img/ampoule.png"/></span>
                        </div>
                        <div id="section5-data-right-lower">
                            <span style="font-size: 1.5em;"><?php echo _("ALLUM&Eacute;ES PENDANT 1H");?></span>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            
            <div id="post-last-section" class="section horizontal-limit">
                <div class="strut"></div>
                <div class="post">
                	<a class="revenir-continuer" onclick="activateTravelling(false);"><?php echo _("CONTINUER");?> <img src="img/chevron-droit.png" /></a>
                </div>
            </div>
            
        </div>
        
        <footer>
            <div  id="bleft" class="bloc">
                <a id="wd" class="liens" href="http://www.wedemain.fr" target="_blank">WE DEMAIN</a>
                <div class="barre"></div>
                <a id="gcl" class="liens" href="http://www.greencodelab.fr" target="_blank">GREEN CODE LAB</a>
                <div class="barre"></div>
                <a id="oo" class="liens" href="http://www.open-odyssey.org" target="_blank">OPEN ODYSSEY</a>
            </div>
            
            <div id="bright" class="bloc">
                <a id="partagesur">
                    <?php echo _("PARTAGE SUR");?>
                </a>
                <a href="https://twitter.com/share?url=http%3A%2F%2Ffabienrichard.fr/projects/wedemain" target="_blank">
                    <img id="twt" class="image" src="img/twitter.png" />
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=http://fabienrichard.fr/projects/wedemain" target="_blank">
                    <img id="fb" class="image" src="img/facebook.png" />						
                </a>
            </div>
            
            <div id="navigation">
                <div onclick="scrollToTextIntro(-1);" id="pn-titre" class="point-navigation selected"></div>
                <div onclick="scrollToTextIntro(310);" id="pn-intro1" class="point-navigation"></div>
                <div onclick="scrollToTextIntro(1110);" id="pn-intro2" class="point-navigation"></div>
                <div onclick="scrollToSection($('#presentation'));" id="pn-presentation" class="point-navigation tooltip tooltip-top" title="<?php echo _("Pr&eacute;sentation");?>"></div>
                <div onclick="scrollToSection($('#section1'));" id="pn-section1" class="point-navigation tooltip tooltip-top" title="<?php echo _("R&eacute;partition de la consommation &eacute;nerg&eacute;tique d'une page Web");?>"></div>
                <div onclick="scrollToSection($('#transition2'));" id="pn-transition2" class="point-navigation tooltip tooltip-top" title="<?php echo _("Le tour du monde en 80 clics");?>"></div>
                <div onclick="scrollToSection($('#transition3'));" id="pn-transition3" class="point-navigation tooltip tooltip-top" title="<?php echo _("L'odyss&eacute;e de l'Octet");?>"></div>
                <div onclick="scrollToSection($('#transition3bis'));" id="pn-transition3bis" class="point-navigation tooltip tooltip-top" title="<?php echo _("Le volume n'est pas le seul responsable");?>"></div>
                <div onclick="scrollToSection($('#section4'));" id="pn-section4" class="point-navigation tooltip tooltip-top" title="<?php echo _("D'autres sites consommateurs");?>"></div>
                <div onclick="scrollToSection($('#transition5'));" id="pn-transition5" class="point-navigation tooltip tooltip-top" title="<?php echo _("Consommation &agrave; grande &eacute;chelle");?>"></div>
                <div onclick="scrollToTextOutro(1070);" id="pn-conclu1" class="point-navigation"></div>
                <div onclick="scrollToTextOutro(600);" id="pn-conclu2" class="point-navigation"></div>
                <div onclick="scrollToTextOutro(100);" id="pn-conclu3" class="point-navigation"></div>
                <div onclick="scrollToTextOutro(-1);" id="pn-conclu" class="point-navigation"></div>
            </div>
            
            
            
        </footer>
        
        <script type="text/javascript" src="d3-js/tools.js"></script>
        <script type="text/javascript" src="d3-js/section1-d3.js"></script>
        <script type="text/javascript" src="d3-js/section2-d3.js"></script>
        <script type="text/javascript" src="d3-js/section3-d3.js"></script>
        <script type="text/javascript" src="d3-js/section4-d3.js"></script>
        <script type="text/javascript" src="d3-js/section5-d3.js"></script>
    </body>
</html>