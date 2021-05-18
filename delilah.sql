-- phpMyAdmin SQL Dump
-- version 4.6.6deb4+deb9u1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 01-12-2020 a las 20:50:54
-- Versión del servidor: 10.1.23-MariaDB-9+deb9u1
-- Versión de PHP: 7.0.33-0+deb9u8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedidos`
--

CREATE TABLE `detalle_pedidos` (
  `id` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `nombre_producto` text COLLATE utf8_spanish_ci NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `detalle_pedidos`
--

INSERT INTO `detalle_pedidos` (`id`, `id_pedido`, `id_producto`, `nombre_producto`, `cantidad`, `precio`) VALUES
(1, 1, 1, 'Empanada Carne', 2, 60),
(2, 1, 6, 'Empanada de Pollo', 4, 61),
(3, 2, 1, 'Empanada Carne', 4, 60),
(4, 2, 6, 'Empanada de Pollo', 2, 61),
(5, 21, 1, 'Empanada Carne', 2, 60),
(6, 21, 6, 'Empanada de Pollo', 3, 61),
(7, 22, 1, 'Empanada Carne', 2, 60),
(8, 22, 6, 'Empanada de Pollo', 3, 61);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `total` float NOT NULL,
  `fecha_pedido` datetime NOT NULL,
  `estado` enum('pedido','preparando','completado','entregado') COLLATE utf8_spanish_ci NOT NULL,
  `fecha_estado` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `id_usuario`, `total`, `fecha_pedido`, `estado`, `fecha_estado`) VALUES
(1, 2, 5000, '2020-11-30 17:47:41', 'pedido', '2020-11-30 17:47:41'),
(2, 3, 1000, '2020-11-30 18:37:37', 'preparando', '2020-11-30 18:01:38'),
(21, 3, 1200, '2020-12-01 17:07:17', 'pedido', '2020-12-01 17:07:17'),
(22, 6, 1200, '2020-12-01 23:45:57', 'pedido', '2020-12-01 23:45:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `precio` float NOT NULL,
  `imagen` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(150) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `imagen`, `descripcion`) VALUES
(1, 'Empanada Carne', 60, 'empanada_carne.png', 'Riquisima empanada de Carne Suave acompañanda con una Salsa de Mondongo'),
(2, 'Ensalada de Tomate y Queso', 112, 'ensalada_tomate.png', 'Ensalada de Tomate con queso '),
(3, 'Empanada de Pollo', 61, 'empanada_pollo.png', 'Riquisima empanada de Pollo acompañanda con Tomate '),
(4, 'Ensalada de Lechuga y Tomate', 130, 'ensalada_lechuga.png', 'Ensalada de lechuga acompañada de Tomate fresco de la sombra'),
(9, 'Ensalada de Rucula y Pomelo', 100, 'ensalada_rucula.png', 'Inponente Ensalada de Rucula y Pomelo '),
(10, 'Milanesa Napolitana con papas Fritas', 300, 'milanesa.png', 'Tremenda Milanesa a la napolitana con Guarnicion de papas'),
(12, 'Empanada de Verdura', 64, 'empanada_verdura.png', 'Riquisima empanada de Verdura acompañanda con Servilleta de carton '),
(13, 'Empanada de Lechuga', 64, 'empanada_verdura.png', 'Riquisima empanada de Verdura acompañanda con Servilleta de papel ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `apellido` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `usuario` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `contrasena` text COLLATE utf8_spanish_ci NOT NULL,
  `telefono` text COLLATE utf8_spanish_ci NOT NULL,
  `domicilio` text COLLATE utf8_spanish_ci NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `usuario`, `email`, `contrasena`, `telefono`, `domicilio`, `admin`) VALUES
(1, 'Leandro', 'Mugnolo', 'Leandrouno', 'lmugnolo@gmail.com', '123', '123456789', 'Micasa 123, Buenos Aires, Argentina', 1),
(2, 'Acamica', 'DWFS', 'Acamica', 'hola@acamica.com', '123', '0303465', 'Buenos Aires, Argentina', 0),
(3, 'Selso', 'Borno', 'Selsito', 'elfa@dfwk.com.', '123', '511555256', 'Bartran 320', 0),
(5, 'Bartolo Meoh', 'Paredes', 'Bartolito', 'barto@lito.com', 'secret', '1233652', 'la granja 236', 0),
(6, 'Bart', 'Montes', 'Bart', 'barto@lito.com', 'secret', '1233652', 'la granja 236', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
