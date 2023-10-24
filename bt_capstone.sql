/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `image_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `content` text NOT NULL,
  `date_comment` datetime NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `image_id` (`image_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `user_id` int DEFAULT NULL,
  `image_id` int NOT NULL AUTO_INCREMENT,
  `source` varchar(255) NOT NULL,
  `name` varchar(155) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `save_image`;
CREATE TABLE `save_image` (
  `image_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `date_save` datetime NOT NULL,
  `save_image_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`save_image_id`),
  KEY `image_id` (`image_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `save_image_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`),
  CONSTRAINT `save_image_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass_word` varchar(255) NOT NULL,
  `age` tinyint unsigned NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comments` (`comment_id`, `image_id`, `user_id`, `content`, `date_comment`) VALUES
(1, 1, 2, 'Great photo!', '2023-10-18 14:30:00');
INSERT INTO `comments` (`comment_id`, `image_id`, `user_id`, `content`, `date_comment`) VALUES
(2, 1, 3, 'I love the colors!', '2023-10-18 15:00:00');
INSERT INTO `comments` (`comment_id`, `image_id`, `user_id`, `content`, `date_comment`) VALUES
(3, 2, 1, 'What a cute dog!', '2023-10-19 09:45:00');
INSERT INTO `comments` (`comment_id`, `image_id`, `user_id`, `content`, `date_comment`) VALUES
(6, 1, 4, 'hehwehwe', '2023-10-24 09:04:23'),
(8, 3, 15, 'haha', '2023-10-24 14:13:34'),
(9, 3, 15, 'haha', '2023-10-24 14:13:53');

INSERT INTO `images` (`user_id`, `image_id`, `source`, `name`, `description`) VALUES
(1, 1, 'image1.jpg', 'Image 1', 'This is an image of a beautiful landscape.');
INSERT INTO `images` (`user_id`, `image_id`, `source`, `name`, `description`) VALUES
(1, 2, 'image2.jpg', 'Image 2', 'This is a picture of a cute dog.');
INSERT INTO `images` (`user_id`, `image_id`, `source`, `name`, `description`) VALUES
(2, 3, 'image3.jpg', 'Image 3', 'A stunning sunset captured on camera.');
INSERT INTO `images` (`user_id`, `image_id`, `source`, `name`, `description`) VALUES
(4, 4, 'image4.jpg', 'Image 4', 'A stunning sunset captured on camera.'),
(4, 8, 'image4.jpg', 'Image 4', 'A stunning sunset captured on camera.'),
(4, 9, 'image5.jpg', 'Image 5', 'A stunning sunset captured on camera.'),
(4, 10, '1698141230474_logo.png', 'logo.png', 'wewewewe'),
(4, 12, 'image4.jpg', 'Image 4', 'A stunning sunset captured on camera.'),
(15, 14, '1698156979290_Code User.png', 'Code User.png', 'hình này đẹp lắm'),
(15, 15, '1698157464145_Code User.png', 'Code User.png', 'hình này đẹp lắm aa');

INSERT INTO `save_image` (`image_id`, `user_id`, `date_save`, `save_image_id`) VALUES
(1, 3, '2023-10-18 17:20:00', 1);
INSERT INTO `save_image` (`image_id`, `user_id`, `date_save`, `save_image_id`) VALUES
(2, 2, '2023-10-19 10:00:00', 2);
INSERT INTO `save_image` (`image_id`, `user_id`, `date_save`, `save_image_id`) VALUES
(1, 4, '2023-10-12 17:00:00', 3);
INSERT INTO `save_image` (`image_id`, `user_id`, `date_save`, `save_image_id`) VALUES
(2, 4, '2023-10-12 17:00:00', 4),
(3, 4, '2023-10-12 17:00:00', 5),
(3, 15, '2023-10-12 17:00:00', 6);

INSERT INTO `users` (`user_id`, `full_name`, `email`, `pass_word`, `age`, `avatar`) VALUES
(1, 'John Doe', 'john.doe@example.com', 'password123', 25, 'avatar1.jpg');
INSERT INTO `users` (`user_id`, `full_name`, `email`, `pass_word`, `age`, `avatar`) VALUES
(2, 'Jane Smith', 'jane.smith@example.com', 'abc123', 30, 'avatar2.jpg');
INSERT INTO `users` (`user_id`, `full_name`, `email`, `pass_word`, `age`, `avatar`) VALUES
(3, 'Michael Johnson', 'michael.johnson@example.com', 'pass456', 40, 'avatar3.jpg');
INSERT INTO `users` (`user_id`, `full_name`, `email`, `pass_word`, `age`, `avatar`) VALUES
(4, 'chau', 'minhchau', '$2b$10$naHDMSCks9eieinNUlwmt.oOMnvhgixtdhJ1oLIpUinwsNufd7a..', 18, '1698154522566_ngon-ngu-lap-trinh-850x415.png'),
(15, 'chau', 'test', '$2b$10$ezsrh3K8m4kuCr76yvw7n.zPQnhfrBMrzegUpqeRve2HUKdvwVt26', 18, '1698156081895_logo.png');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;