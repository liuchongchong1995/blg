const title = '中国科协十大代表委员信息系统';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }

  return `${title}`;
}
