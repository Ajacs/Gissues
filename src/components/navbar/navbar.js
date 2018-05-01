import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import gissuesLogo from 'new_gissues.png';

const Navbar = () =>

    (<Menu stackable>
      <Menu.Item
        as={Link}
        to="/">
        <img className="ui mini image" style={{marginRight: "2.5em"}} src={gissuesLogo} alt='logo'/>
      </Menu.Item>

      <Menu.Item
        as="a"
        target="_blank"
        href="https://github.com/Ajacs?tab=repositories"
        name='github'>
          Adderly Jáuregui Campos
      </Menu.Item>

      <Menu.Item
        as="a"
        target="_blank"
        href="https://www.linkedin.com/in/adderly-j%C3%A1uregui-campos-44b32a52/"
        name='linkedin'>
          LinkedIn
      </Menu.Item>

      <Menu.Item
        as="a"
        target="_blank"
        href="https://google.com"
        name='google'>
          ...Google?
      </Menu.Item>
    </Menu>)

export default Navbar;
