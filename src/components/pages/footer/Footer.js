import { Layout } from 'antd';

const CustomFooter = () => (
  <div>
    <Layout.Footer style={{ textAlign: 'center' }}>
      Built with ❤️ by{' '}
      <a
        href="https://github.com/GrupoLIA/AdminPanel"
        rel="noopener noreferrer"
        target="_blank"
      >
        LIA Group
      </a>
    </Layout.Footer>
  </div>
);

export default CustomFooter;
