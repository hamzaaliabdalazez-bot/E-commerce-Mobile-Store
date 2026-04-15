"use client";

import { useState, useContext, useEffect, useMemo } from "react";
import { CartContext, CartProvider } from "@/context/CartContext";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import "../../app/globals.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { ThemeModeContext } from "@/context/ThemeContext";



const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function Navbar() {
  const { mode, toggleTheme, language, toggleLanguage } =
    useContext(ThemeModeContext);
  const navLinks = [
    { label: language === "EN" ? "Home" : "الرئيسية", href: "/" },
    { label: language === "EN" ? "Products" : "المنتجات", href: "/products" },
    { label: language === "EN" ? "Cart" : "السلة", href: "/cart" },
  ];
  const categoriesList = [
    {
      label: language === "EN" ? "mobiles" : "الهواتف",
      value: language === "EN" ? "mobiles" : "الهواتف",
      href: "/categories/mobiles",
    },
    {
      label: language === "EN" ? "covers" : "أغلفة",
      value: language === "EN" ? "covers" : "أغلفة",
      href: "/categories/covers",
    },
    {
      label: language === "EN" ? "chargers" : "شاحنات",
      value: language === "EN" ? "chargers" : "شاحنات",
      href: "/categories/chargers",
    },
  ];
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: session } = useSession();

  const { cart, hydrated, totalItems } = useContext(CartContext);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky" color="primary" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left */}
        <IconButton color="inherit" edge="start" onClick={() => setOpen(true)}>
          <MenuIcon />
        </IconButton>

        <Typography
          component={Link}
          href="/"
          variant="h6"
          sx={{ color: "inherit", textDecoration: "none" }}
        >
          {language === "EN" ? "Mobile Store" : "متجر الهواتف"}
        </Typography>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Button component={Link} href="/products" color="inherit">
            {language === "EN" ? "Products" : "المنتجات"}
          </Button>

          {/* Cart */}

          <IconButton href="/cart" component={Link}>
            <ShoppingCartIcon fontSize="small" color="secondary" />
            <CartBadge
              badgeContent={hydrated ? totalItems : 0}
              color="secondary"
              overlap="circular"
            />
          </IconButton>

          {/* Theme */}
          <Switch
            checked={mode === "dark"}
            onChange={toggleTheme}
            color="default"
          />

          {/* Language */}
          <Button onClick={toggleLanguage} color="inherit">
            {language}
          </Button>

          {/* Auth */}
          {session ? (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                {session.user?.image ? (
                  <Avatar
                    src={session.user.image}
                    alt={session.user.name || "User"}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem
                  component={Link}
                  href="/dashboard/user"
                  onClick={handleMenuClose}
                >
                  {language === "EN" ? "My Account" : "حسابي"}
                </MenuItem>

                {session.user?.role === "ADMIN" && (
                  <MenuItem
                    component={Link}
                    href="/dashboard/admin"
                    onClick={handleMenuClose}
                  >
                    {language === "EN" ? "Admin Dashboard" : "لوحة تحكم الإدارة"}
                  </MenuItem>
                )}

                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  {language === "EN" ? "Logout" : "تسجيل الخروج"}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button component={Link} href="/auth/login" color="inherit">
              {language === "EN" ? "Login" : "تسجيل الدخول"}
            </Button>
          )}
        </div>
      </Toolbar>

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 260 }}>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                className="s"
                onClick={() => setOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}

          {categoriesList.map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton
                component={Link}
                href={category.href}
                onClick={() => setOpen(false)}
              >
                <ListItemText primary={category.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
