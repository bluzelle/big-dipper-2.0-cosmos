import React from 'react';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import dayjs, { formatDayJs } from '@utils/dayjs';
import {
  Divider, Typography,
} from '@material-ui/core';
import { AvatarName } from '@components';
import { useRecoilValue } from 'recoil';
import { readDate } from '@recoil/settings';
import { formatNumber } from '@utils/format_token';
import { useStyles } from './styles';
import { ItemType } from '../../types';

const Mobile: React.FC<{
  className?: string;
  items: ItemType[];
}> = ({
  className, items,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('accounts');
  const dateFormat = useRecoilValue(readDate);
  const formattedItems = items.map((x) => {
    const entries = x.entries.map((y) => ({
      amount: `${formatNumber(y.amount.value, y.amount.exponent)} ${y.amount.displayDenom.toUpperCase()}`,
      completionTime: formatDayJs(dayjs.utc(y.completionTime), dateFormat),
    }));
    return ({
      address: (
        <AvatarName
          address={x.address.address}
          imageUrl={x.address.imageUrl}
          name={x.address.name}
        />
      ),
      entries,
    });
  });

  return (
    <div className={classnames(className)}>
      {formattedItems.map((x, i) => {
        return (
          <React.Fragment key={`votes-mobile-${i}`}>
            <div className={classes.list}>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('address')}
                </Typography>
                {x.address}
              </div>
              {
                x.entries.map((y, index) => {
                  return (
                    <div className={classes.item} key={`mobile-entries-${y.completionTime}-${index}`}>
                      <Typography variant="h4" className="label">
                        {y.completionTime}
                      </Typography>
                      <Typography variant="body1" className="value">
                        {y.amount}
                      </Typography>
                    </div>
                  );
                })
              }
            </div>
            {i !== items.length - 1 && <Divider />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Mobile;
