-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: localhost    Database: rstwo
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `basket`
--

DROP TABLE IF EXISTS `basket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `userId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(3,0) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId_idx` (`productId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `productId` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket`
--

LOCK TABLES `basket` WRITE;
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
/*!40000 ALTER TABLE `basket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `type` varchar(8) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` decimal(4,0) NOT NULL,
  `image` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Pokemon-Legenden','game','Fange und erforsche wilde Pokemon in einem langst vergangenen Zeitalter Sinnohs, um den ersten Pokedex der Region zu vervollstandigen.\n',60,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_88797202/fee_786_587_png'),(2,'Call of Duty','game','Vanguard kehrt der Spieler zuruck, in packende Kampfe bislang unbekannten globalen Ausmaßes des 2. Weltkriegs',49,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_87797429/fee_786_587_png'),(3,'NINTENDO Switch','game','Fur intuitive Bedienbarkeit und den notigen Speed sorgt der mitgelieferte Controller (Joy-Con).',360,'https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-82086848/fee_786_587_png'),(4,'Mario Kart 8 Deluxe','game','Die Welt steht Kopf - in Mario Kart 8 Deluxe! Im Anti-Schwerkraft-Modus konnen Sie die erstaunlichsten',24,'https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-73372542/fee_786_587_png'),(5,'Death Stranding','game','Der legendare Spieleschopfer Hideo Kojima bietet ein Erlebnis, das sich allen Genredefinitionen entzieht - jetzt im ultimativen Directors Cut erweitert und remastered.',60,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_85690149/fee_786_587_png'),(6,'Fruit Ninja','game','Die legendare Black Ops-Reihe ist mit Call of Duty: Black Ops Cold War zuruck - der direkten Fortsetzung zum beliebten Original Call of Duty: Black Ops.',70,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_78423596/fee_786_587_png'),(7,'Fifa 22','game','Die EA SPORTS FIFA-Neuheit HyperMotion kombiniert auf den Next-Gen-Konsolen erstmals zwei Technologien und sorgt so fur eine echt',40,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_86521422/fee_786_587_png'),(8,'Back 4 Blood','game','Kampfe dich durch eine dynamische, gefahrliche Welt in einer 4-Spieler Koop Story-Kampagne, in der ihr zusammenarbeiten musst,',56,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_86115585/fee_786_587_png'),(9,'Ratchet & Clank','game','Action-geladener Sprung ins Paralleluniversum',30,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_83945005/fee_786_587_png'),(10,'DUALSHOCK4 Controller','game','Der DUALSHOCK 4 Wireless-Controller bietet eine Kombination aus revolutionaren Funktionen in einem intuitiven Design und praziser Steuerung und definiert so eine vollkommen neue Generation des Gamings.',70,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_72573232/fee_786_587_png'),(11,'Yo-Kai Watch','book','Nathan ist ein ganz normaler Junge. Doch als er den quirligen Yo-kai „Whisper“ aus einem Spielzeugautomaten befreit, erhalt er zum Dank ei',34,'https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-75715590/fee_786_587_png'),(12,'Animal Crossing','book','In Animal Crossing™: New Horizons kommst du auf eine verlassene Insel, die du zum eigenen Paradies umgestalten kannst, ',28,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_73126213/fee_786_587_png'),(13,'Punch Man Sammelschuber','book','Glatze, Gummistiefel, genervter Blick ... was Superhelden-Merkmale angeht, rauscht Saitama gnadenlos durch den Sehtest',46,'https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-76804495/fee_786_587_png'),(14,'Tokyo Ghoul','book','Dem Tod gerade noch mal von der Schippe gesprungen, erwacht Oberschuler Ken als Ghul wieder',13,'https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-74040205/fee_786_587_png'),(15,'chnell zum Ziel','book','as pfiffige Nachschlagewerk',24,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_70144617/fee_786_587_png'),(16,'Die Neuheiten','book','Mit der Neuigkeit der Firma Microsoft, Windows 11 zu bringen, hat die Firma alle uberrascht',57,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_87977664/fee_786_587_png'),(17,'Blue Exorcist','book','Als Rin und seine Freunde auf eine Mission geschickt werden, taucht plotzlich Amaimon, der „Erdkonig“, auf und stiehlt Rins Schwert,',43,'https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-68505355/fee_786_587_png'),(18,'Die Welt von Tom','book','Das ultimative Begleitbuch zu Tom Clancy’s Ghost Recon Breakpoint',14,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_70462122/fee_786_587_png'),(19,'Haikyuu','book','Shoyo ist ein Ass am Volleyball-Netz, niemand springt so hoch wie er. Sein großes Talent bringt ihn an die Karasuno-Oberschule',55,'https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-76040666/fee_786_587_png'),(20,'Kampfer','book','Die Madchen spuren, dass der letzte große Showdown bevorsteht, und gestehen Natsuru noch schnell reihenweise ihre Liebe.',35,'https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-74324179/fee_786_587_png'),(21,'Rammstein','music','Der achte Longplayer der Berliner Musiker folgt auf das unbetitelte Nummer-Eins-Werk, mit dem die Band 2019',56,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_92197844/fee_786_587_png'),(22,'ABBA Gold','music','ABBAs meistverkauftes Album aller Zeiten ist jetzt als schwarze Kassette in limitierter Auflage erhaltlich, mit 19 zeitlosen Hits wie \"Dancing Queen\" und \"Mamma Mia\".',70,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_96326682/fee_786_587_png'),(23,'DJ Bobo - EVOLUT30N','music','e Dame sofort gute Laune, ist ein typischer HoHNER-Hit, der im Karneval genauso zu Hause ist, wie auf jeder anderen gut sortierten Party.',60,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_96273787/fee_786_587_png'),(24,'Eminem - Curtain Call','music','Weltbekannt fur seinen einzigartigen Flow, zahlt Eminem seit uber 20 Jahren zu den großten Schwergewichten',28,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_95818886/fee_786_587_png'),(25,'Hohner 50 Jahre','music','Ob „Viva Colonia“ oder „Wenn nicht jetzt, wann dann?“: Auch hartnackigste Karnevalverweigerer konnen ',68,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_95951054/fee_786_587_png'),(26,'Phil Siemers - Marleen','music','eine Karaoke CD mit den großten Hits fur eine rauschende HoHNER Karaoke Party. ',48,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_96097629/fee_786_587_png'),(27,'Enhypen - Manifesto','music','MANIFESTO : DAY ONE (Standard Edition) wird in drei verschiedenen Versionen erhaltlich sein: D, J und M. Der Inhalt des Albums umfasst eine CD',64,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_94902617/fee_786_587_png'),(28,'Tool - Fear Inoculum','music','Zu den Tool-Mitgliedern gehoren Schlagzeuger Danny Carey, Gitarrist Adam Jones, Bassist Justin Chancellor und Sanger Maynard James Keenan.',25,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_95162048/fee_786_587_png'),(29,'Enhypen - MANFESTO','music','DAY ONE (Standard Edition) wird in drei verschiedenen Versionen erhaltlich sein: D, J und M. Der Inhalt des Albums umfasst eine CD',27,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_94774807/fee_786_587_png'),(30,'The Damned','music','Ara bis zum jungsten Music To Be Murdered By – Side B-Album vereint das neue Best-of-Album',59,'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_95914459/fee_786_587_png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `loginName` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-14  0:06:48
