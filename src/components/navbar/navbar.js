import React from 'react';
import { Menu } from 'semantic-ui-react';
import gissuesLogo from 'new_gissues.png';

const options = [
  { key: 'search_by_users', text: 'Search by Users', value: 'search_by_users' },
  { key: 'search_by_repositories', text: 'Search by Repositories', value: 'search_by_repositories' }
];

const Navbar = () =>

    (<Menu stackable>
      <Menu.Item
        as="a"
        href="https://github.com/Ajacs/Gissues"
        target="_blank">
        <img class="ui mini image" style={{marginRight: "2.5em"}} src={gissuesLogo} />
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
