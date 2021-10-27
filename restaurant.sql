-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2020 at 04:01 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(100) NOT NULL,
  `admin_image` varchar(20) NOT NULL DEFAULT 'vector.png',
  `email` varchar(100) NOT NULL,
  `password` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `admin_name`, `admin_image`, `email`, `password`) VALUES
(2, 'Ahmed mAnO', '2.jpeg', 'mymanos2000@gmail.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `booking_table`
--

CREATE TABLE `booking_table` (
  `customer_id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `num_of_people` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `note` varchar(255) NOT NULL DEFAULT 'No Notes',
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `cat_id` int(11) NOT NULL,
  `cat_name` varchar(100) NOT NULL,
  `cat_image` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cat_id`, `cat_name`, `cat_image`) VALUES
(33, 'Breakfast', '33.jpeg'),
(46, 'Sweet', '46.png'),
(49, 'Burger', '49.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(70) NOT NULL,
  `image` varchar(20) NOT NULL DEFAULT 'avatar.png',
  `address` varchar(100) DEFAULT 'Nan',
  `birth_date` date DEFAULT '1900-01-01',
  `phone` varchar(12) NOT NULL,
  `cridet_card` varchar(16) DEFAULT 'Nan',
  `Blocked` tinyint(1) NOT NULL DEFAULT 0,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `full_name`, `email`, `password`, `image`, `address`, `birth_date`, `phone`, `cridet_card`, `Blocked`, `token`) VALUES
(1, 'Ahmed mano', 'ahmed@gmail.com', '123', 'avatar.png', 'Kamal El-Shazly, Kafr Sangelaf Al Qadim, El-Bagour, Menofia Governorate, Egypt', '2018-02-20', '01069103255', '125555555555555', 0, 'fULD60iFRZyXm4d5yUGidc:APA91bHcFCz9dw9nwwMb1XhzG-Wh3A_sdmgDR93MkOVOMSJ0x2xvIPoXWwEnLHjVqQusGjxGgbCDhdrGrZE5jdt44X72-_CvgcnPdf6trUWs4yzGY2oPaODEN2uCFaCd1i_Rrg2GOddz'),
(6, 'Ahmed mAnO', 'mAnO@gmail.com', '123', 'avatar.png', 'Kamal El-Shazly, Kafr Sangelaf Al Qadim, El-Bagour, Menofia Governorate, Egypt', '1900-01-01', '01014526687', 'Nan', 0, 'fULD60iFRZyXm4d5yUGidc:APA91bHcFCz9dw9nwwMb1XhzG-Wh3A_sdmgDR93MkOVOMSJ0x2xvIPoXWwEnLHjVqQusGjxGgbCDhdrGrZE5jdt44X72-_CvgcnPdf6trUWs4yzGY2oPaODEN2uCFaCd1i_Rrg2GOddz'),
(26, 'Ahmed Mamdouh', 'AhmedMamdouh@gmail.com', '123', 'avatar.png', 'Unnamed Road, كفر الباجور، الباجور،،, كفر الباجور، الباجور، المنوفية، Egypt', '1900-01-01', '01069103550', 'Nan', 0, 'fULD60iFRZyXm4d5yUGidc:APA91bHcFCz9dw9nwwMb1XhzG-Wh3A_sdmgDR93MkOVOMSJ0x2xvIPoXWwEnLHjVqQusGjxGgbCDhdrGrZE5jdt44X72-_CvgcnPdf6trUWs4yzGY2oPaODEN2uCFaCd1i_Rrg2GOddz');

-- --------------------------------------------------------

--
-- Table structure for table `customer_feedback`
--

CREATE TABLE `customer_feedback` (
  `com_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `meal_id` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `rate` int(1) NOT NULL,
  `date_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer_feedback`
--

INSERT INTO `customer_feedback` (`com_id`, `customer_id`, `meal_id`, `comment`, `rate`, `date_time`) VALUES
(75, 1, 32, 'this good', 5, '2020-12-18 14:03:25'),
(76, 1, 27, 'good and delicious', 4, '2020-12-18 14:08:54'),
(77, 1, 22, 'd delicious', 4, '2020-12-18 14:19:19'),
(80, 1, 31, 'good ', 4, '2020-12-18 14:35:31');

-- --------------------------------------------------------

--
-- Table structure for table `customer_order`
--

CREATE TABLE `customer_order` (
  `order_id` int(11) NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'New_Order',
  `date` date NOT NULL,
  `time` time NOT NULL,
  `payment_method` varchar(50) NOT NULL DEFAULT 'COD',
  `delivery_method` varchar(50) NOT NULL DEFAULT 'DELIVERY',
  `cutomer_id` int(11) NOT NULL,
  `isOrdered` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer_order`
--

INSERT INTO `customer_order` (`order_id`, `status`, `date`, `time`, `payment_method`, `delivery_method`, `cutomer_id`, `isOrdered`) VALUES
(30, 'Dispatched', '2020-12-15', '15:32:52', 'COD', 'delivery', 1, 1),
(31, 'Delivered', '2020-12-16', '16:37:25', 'COD', 'delivery', 1, 1),
(32, 'Cancel', '2020-12-16', '16:40:05', 'COD', 'delivery', 1, 1),
(33, 'Dispatched', '2020-12-19', '00:50:09', 'COD', 'delivery', 6, 1),
(34, 'Dispatched', '2020-12-19', '01:43:55', 'COD', 'delivery', 26, 1);

-- --------------------------------------------------------

--
-- Table structure for table `meal_product`
--

CREATE TABLE `meal_product` (
  `meal_id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `meal_name` varchar(100) NOT NULL,
  `meal_price` decimal(8,2) NOT NULL,
  `old_price` decimal(8,2) NOT NULL DEFAULT 0.00,
  `meal_image` varchar(20) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `meal_product`
--

INSERT INTO `meal_product` (`meal_id`, `cat_id`, `meal_name`, `meal_price`, `old_price`, `meal_image`, `description`) VALUES
(22, 33, 'hot chacken', '63.75', '85.00', '22.png', 'very nice and good'),
(25, 33, 'checen', '36.45', '40.50', '25.png', ' hdhdhdhdhdh'),
(27, 46, 'koftwa', '1450.00', '0.00', '27.jpeg', ' very hot and more sweet'),
(31, 46, 'Konafa', '50.00', '0.00', '31.jpeg', ' konafa ia very good sweet made ur day'),
(32, 49, 'hot Burger', '100.00', '0.00', '32.png', ' hot burger is very good meal'),
(33, 49, 'hot Burger', '50.00', '0.00', '33.jpeg', ' hot burger');

-- --------------------------------------------------------

--
-- Table structure for table `meal_saved`
--

CREATE TABLE `meal_saved` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `meal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `meal_saved`
--

INSERT INTO `meal_saved` (`id`, `customer_id`, `meal_id`) VALUES
(51, 1, 27),
(52, 1, 31);

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `offer_id` int(11) NOT NULL,
  `meal_id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `old_price` decimal(8,2) NOT NULL,
  `new_price` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order_info`
--

CREATE TABLE `order_info` (
  `meal_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_info`
--

INSERT INTO `order_info` (`meal_id`, `order_id`, `quantity`) VALUES
(22, 30, 2),
(22, 31, 1),
(22, 33, 3),
(25, 30, 2),
(25, 34, 2),
(27, 32, 3),
(27, 34, 2);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_table`
--

CREATE TABLE `restaurant_table` (
  `table_id` int(11) NOT NULL,
  `no_of_chairs` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `restaurant_table`
--

INSERT INTO `restaurant_table` (`table_id`, `no_of_chairs`) VALUES
(1, 4),
(2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

CREATE TABLE `slider` (
  `slide_id` int(11) NOT NULL,
  `image` varchar(20) NOT NULL,
  `meal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `slider`
--

INSERT INTO `slider` (`slide_id`, `image`, `meal_id`) VALUES
(11, '11.png', 27),
(12, '12.jpeg', 22),
(13, '13.jpeg', 25);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_couut_meal_poupular`
-- (See below for the actual view)
--
CREATE TABLE `v_couut_meal_poupular` (
`meal_id` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_customer_table`
-- (See below for the actual view)
--
CREATE TABLE `v_customer_table` (
`full_name` varchar(100)
,`image` varchar(20)
,`phone` varchar(12)
,`address` varchar(100)
,`date` date
,`time` time
,`customer_id` int(11)
,`order_id` int(11)
,`table_id` int(11)
,`num_of_people` int(11)
,`note` varchar(255)
,`payment_method` varchar(50)
,`delivery_method` varchar(50)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_managecomment`
-- (See below for the actual view)
--
CREATE TABLE `v_managecomment` (
`full_name` varchar(100)
,`image` varchar(20)
,`comment` varchar(255)
,`rate` int(1)
,`customer_id` int(11)
,`meal_id` int(11)
,`date_time` datetime
,`com_id` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_most_meal_ordered`
-- (See below for the actual view)
--
CREATE TABLE `v_most_meal_ordered` (
`meal_name` varchar(100)
,`meal_image` varchar(20)
,`meal_price` decimal(8,2)
,`description` varchar(255)
,`meal_id` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_order_details`
-- (See below for the actual view)
--
CREATE TABLE `v_order_details` (
`order_id` int(11)
,`meal_price` decimal(8,2)
,`meal_id` int(11)
,`meal_image` varchar(20)
,`meal_name` varchar(100)
,`quantity` int(11)
,`total_price` decimal(18,2)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_productsorder_data`
-- (See below for the actual view)
--
CREATE TABLE `v_productsorder_data` (
`full_name` varchar(100)
,`image` varchar(20)
,`address` varchar(100)
,`phone` varchar(12)
,`birth_date` date
,`token` varchar(255)
,`order_id` int(11)
,`date` date
,`time` time
,`status` varchar(30)
,`payment_method` varchar(50)
,`delivery_method` varchar(50)
,`cutomer_id` int(11)
,`isOrdered` tinyint(1)
,`Num_items` bigint(21)
,`total_price` decimal(40,2)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_saved`
-- (See below for the actual view)
--
CREATE TABLE `v_saved` (
`meal_name` varchar(100)
,`meal_image` varchar(20)
,`meal_price` decimal(8,2)
,`description` varchar(255)
,`id` int(11)
,`customer_id` int(11)
,`meal_id` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_slider`
-- (See below for the actual view)
--
CREATE TABLE `v_slider` (
`meal_name` varchar(100)
,`meal_image` varchar(20)
,`meal_price` decimal(8,2)
,`description` varchar(255)
,`slide_id` int(11)
,`image` varchar(20)
,`meal_id` int(11)
);

-- --------------------------------------------------------

--
-- Structure for view `v_couut_meal_poupular`
--
DROP TABLE IF EXISTS `v_couut_meal_poupular`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_couut_meal_poupular`  AS  select `order_info`.`meal_id` AS `meal_id` from `order_info` group by `order_info`.`meal_id` order by count(0) desc ;

-- --------------------------------------------------------

--
-- Structure for view `v_customer_table`
--
DROP TABLE IF EXISTS `v_customer_table`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_customer_table`  AS  select `customer`.`full_name` AS `full_name`,`customer`.`image` AS `image`,`customer`.`phone` AS `phone`,`customer`.`address` AS `address`,`booking_table`.`date` AS `date`,`booking_table`.`time` AS `time`,`booking_table`.`customer_id` AS `customer_id`,`booking_table`.`order_id` AS `order_id`,`booking_table`.`table_id` AS `table_id`,`booking_table`.`num_of_people` AS `num_of_people`,`booking_table`.`note` AS `note`,`customer_order`.`payment_method` AS `payment_method`,`customer_order`.`delivery_method` AS `delivery_method` from ((`customer` join `booking_table`) join `customer_order`) where `customer`.`customer_id` = `booking_table`.`customer_id` and `customer_order`.`order_id` = `booking_table`.`order_id` ;

-- --------------------------------------------------------

--
-- Structure for view `v_managecomment`
--
DROP TABLE IF EXISTS `v_managecomment`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_managecomment`  AS  select `customer`.`full_name` AS `full_name`,`customer`.`image` AS `image`,`customer_feedback`.`comment` AS `comment`,`customer_feedback`.`rate` AS `rate`,`customer_feedback`.`customer_id` AS `customer_id`,`customer_feedback`.`meal_id` AS `meal_id`,`customer_feedback`.`date_time` AS `date_time`,`customer_feedback`.`com_id` AS `com_id` from ((`meal_product` join `customer`) join `customer_feedback`) where `meal_product`.`meal_id` = `customer_feedback`.`meal_id` and `customer`.`customer_id` = `customer_feedback`.`customer_id` ;

-- --------------------------------------------------------

--
-- Structure for view `v_most_meal_ordered`
--
DROP TABLE IF EXISTS `v_most_meal_ordered`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_most_meal_ordered`  AS  select `meal_product`.`meal_name` AS `meal_name`,`meal_product`.`meal_image` AS `meal_image`,`meal_product`.`meal_price` AS `meal_price`,`meal_product`.`description` AS `description`,`v_couut_meal_poupular`.`meal_id` AS `meal_id` from (`v_couut_meal_poupular` join `meal_product`) where `meal_product`.`meal_id` = `v_couut_meal_poupular`.`meal_id` limit 10 ;

-- --------------------------------------------------------

--
-- Structure for view `v_order_details`
--
DROP TABLE IF EXISTS `v_order_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_order_details`  AS  select `customer_order`.`order_id` AS `order_id`,`meal_product`.`meal_price` AS `meal_price`,`meal_product`.`meal_id` AS `meal_id`,`meal_product`.`meal_image` AS `meal_image`,`meal_product`.`meal_name` AS `meal_name`,`order_info`.`quantity` AS `quantity`,`order_info`.`quantity` * `meal_product`.`meal_price` AS `total_price` from ((`order_info` join `meal_product`) join `customer_order`) where `meal_product`.`meal_id` = `order_info`.`meal_id` and `order_info`.`order_id` = `customer_order`.`order_id` ;

-- --------------------------------------------------------

--
-- Structure for view `v_productsorder_data`
--
DROP TABLE IF EXISTS `v_productsorder_data`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_productsorder_data`  AS  select `customer`.`full_name` AS `full_name`,`customer`.`image` AS `image`,`customer`.`address` AS `address`,`customer`.`phone` AS `phone`,`customer`.`birth_date` AS `birth_date`,`customer`.`token` AS `token`,`customer_order`.`order_id` AS `order_id`,`customer_order`.`date` AS `date`,`customer_order`.`time` AS `time`,`customer_order`.`status` AS `status`,`customer_order`.`payment_method` AS `payment_method`,`customer_order`.`delivery_method` AS `delivery_method`,`customer_order`.`cutomer_id` AS `cutomer_id`,`customer_order`.`isOrdered` AS `isOrdered`,(select count(0) from `order_info` where `order_info`.`order_id` = `customer_order`.`order_id`) AS `Num_items`,(select sum(`v_order_details`.`total_price`) from `v_order_details` where `v_order_details`.`order_id` = `customer_order`.`order_id`) AS `total_price` from (`customer` join `customer_order`) where `customer_order`.`cutomer_id` = `customer`.`customer_id` ;

-- --------------------------------------------------------

--
-- Structure for view `v_saved`
--
DROP TABLE IF EXISTS `v_saved`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_saved`  AS  select `meal_product`.`meal_name` AS `meal_name`,`meal_product`.`meal_image` AS `meal_image`,`meal_product`.`meal_price` AS `meal_price`,`meal_product`.`description` AS `description`,`meal_saved`.`id` AS `id`,`meal_saved`.`customer_id` AS `customer_id`,`meal_saved`.`meal_id` AS `meal_id` from (`meal_saved` join `meal_product`) where `meal_saved`.`meal_id` = `meal_product`.`meal_id` ;

-- --------------------------------------------------------

--
-- Structure for view `v_slider`
--
DROP TABLE IF EXISTS `v_slider`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_slider`  AS  select `meal_product`.`meal_name` AS `meal_name`,`meal_product`.`meal_image` AS `meal_image`,`meal_product`.`meal_price` AS `meal_price`,`meal_product`.`description` AS `description`,`slider`.`slide_id` AS `slide_id`,`slider`.`image` AS `image`,`slider`.`meal_id` AS `meal_id` from (`meal_product` join `slider`) where `meal_product`.`meal_id` = `slider`.`meal_id` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `booking_table`
--
ALTER TABLE `booking_table`
  ADD UNIQUE KEY `order_id` (`order_id`),
  ADD KEY `customer_booking_fk_customer_id` (`customer_id`),
  ADD KEY `table_booking_fk_table_id` (`table_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cat_id`),
  ADD UNIQUE KEY `cat_name` (`cat_name`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `email` (`email`) USING BTREE;

--
-- Indexes for table `customer_feedback`
--
ALTER TABLE `customer_feedback`
  ADD PRIMARY KEY (`com_id`),
  ADD KEY `customer_feedbake_fk_customer_id` (`customer_id`),
  ADD KEY `meal_feedback_fk_meal_id` (`meal_id`);

--
-- Indexes for table `customer_order`
--
ALTER TABLE `customer_order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_order_fk_customer_id` (`cutomer_id`);

--
-- Indexes for table `meal_product`
--
ALTER TABLE `meal_product`
  ADD PRIMARY KEY (`meal_id`),
  ADD KEY `cat_meal_fk_cat_id` (`cat_id`);

--
-- Indexes for table `meal_saved`
--
ALTER TABLE `meal_saved`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customer_id` (`customer_id`,`meal_id`),
  ADD KEY `saved_meal_id` (`meal_id`);

--
-- Indexes for table `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`offer_id`),
  ADD KEY `meal_offer_fk` (`meal_id`),
  ADD KEY `cat_offer_cat_id_fk` (`cat_id`);

--
-- Indexes for table `order_info`
--
ALTER TABLE `order_info`
  ADD PRIMARY KEY (`meal_id`,`order_id`) USING BTREE,
  ADD KEY `order_orderinfo_fk_order_id` (`order_id`);

--
-- Indexes for table `restaurant_table`
--
ALTER TABLE `restaurant_table`
  ADD PRIMARY KEY (`table_id`);

--
-- Indexes for table `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`slide_id`),
  ADD KEY `meal_slider_fk_meal_id` (`meal_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `customer_feedback`
--
ALTER TABLE `customer_feedback`
  MODIFY `com_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `customer_order`
--
ALTER TABLE `customer_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `meal_product`
--
ALTER TABLE `meal_product`
  MODIFY `meal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `meal_saved`
--
ALTER TABLE `meal_saved`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `offer`
--
ALTER TABLE `offer`
  MODIFY `offer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `restaurant_table`
--
ALTER TABLE `restaurant_table`
  MODIFY `table_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `slider`
--
ALTER TABLE `slider`
  MODIFY `slide_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking_table`
--
ALTER TABLE `booking_table`
  ADD CONSTRAINT `customer_booking_fk_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_orderid` FOREIGN KEY (`order_id`) REFERENCES `customer_order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `table_booking_fk_table_id` FOREIGN KEY (`table_id`) REFERENCES `restaurant_table` (`table_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customer_feedback`
--
ALTER TABLE `customer_feedback`
  ADD CONSTRAINT `customer_feedbake_fk_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `meal_feedback_fk_meal_id` FOREIGN KEY (`meal_id`) REFERENCES `meal_product` (`meal_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customer_order`
--
ALTER TABLE `customer_order`
  ADD CONSTRAINT `customer_order_fk_customer_id` FOREIGN KEY (`cutomer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `meal_product`
--
ALTER TABLE `meal_product`
  ADD CONSTRAINT `cat_meal_fk_cat_id` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `meal_saved`
--
ALTER TABLE `meal_saved`
  ADD CONSTRAINT `saved_cust_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `saved_meal_id` FOREIGN KEY (`meal_id`) REFERENCES `meal_product` (`meal_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `offer`
--
ALTER TABLE `offer`
  ADD CONSTRAINT `cat_offer_cat_id_fk` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `meal_offer_fk` FOREIGN KEY (`meal_id`) REFERENCES `meal_product` (`meal_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_info`
--
ALTER TABLE `order_info`
  ADD CONSTRAINT `meal_orderinfo_fk_meal_id` FOREIGN KEY (`meal_id`) REFERENCES `meal_product` (`meal_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_orderinfo_fk_order_id` FOREIGN KEY (`order_id`) REFERENCES `customer_order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `slider`
--
ALTER TABLE `slider`
  ADD CONSTRAINT `meal_slider_fk_meal_id` FOREIGN KEY (`meal_id`) REFERENCES `meal_product` (`meal_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
