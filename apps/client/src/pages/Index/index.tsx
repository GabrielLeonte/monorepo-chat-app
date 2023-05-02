import ChannelContent from '../../components/channel-content';
import Sidebar from '../../components/sidebar';

import './style.scss';

const Index = () => {
  return (
    <div className="index">
      <Sidebar />
      <ChannelContent />
    </div>
  );
};

export default Index;
