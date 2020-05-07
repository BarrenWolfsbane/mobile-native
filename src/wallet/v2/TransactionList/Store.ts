import { toFriendlyCryptoVal } from '../../../common/helpers/currency';
import formatDate from '../../../common/helpers/date';
import groupBy from '../../../common/helpers/groupBy';
import type UserStore from '../../../auth/UserStore';
import UserModel from '../../../channel/UserModel';
import { SectionListEntities, ExtendedEntity, deltaType } from './types';
import { WalletStoreType as WalletStore } from '../createWalletStore';

const createTransactionsListStore = () => {
  const store = {
    wallet: {} as WalletStore,
    user: {} as UserStore,
    loading: true,
    loaded: false,
    from: {} as Date,
    to: {} as Date,
    list: [] as Array<SectionListEntities>,
    refreshing: false,
    runningTotal: 0,
    previousTxAmount: 0,
    async initialLoad(wallet: WalletStore, user: UserStore) {
      this.wallet = wallet;
      this.user = user;

      this.runningTotal = wallet.balance;

      this.wallet.ledger.setMode('transactions');
      this.wallet.ledger.list.clearList();

      const end = new Date();
      const start = new Date();
      end.setHours(23, 59, 59);
      start.setMonth(start.getMonth() - 6);
      start.setHours(0, 0, 0);

      this.from = start;
      this.to = end;

      this.loadMore();

      this.loaded = true;
    },
    setLoadin(loading) {
      this.loading = loading;
    },
    loadMore() {
      this.refreshing = true;
      this.wallet.ledger.loadList(this.from, this.to);
    },
    getUser(entity: ExtendedEntity) {
      const selfUsername = this.user.me.username,
        isSender =
          entity.sender.username.toLowerCase() !== selfUsername.toLowerCase(),
        user = UserModel.checkOrCreate(
          isSender ? entity.sender : entity.receiver,
        );
      return {
        avatar: user.getAvatarSource(),
        username: user.username,
        isSender,
      };
    },
    /**
     * Get String representing the change of overall amount
     * @param entity
     */
    getDelta(contract: string, amount: number): deltaType {
      let delta: deltaType = 'neutral';
      if (contract !== 'offchain:withdraw') {
        delta = amount < 0 ? 'negative' : 'positive';
      }
      return delta;
    },
    formatAmount(amount) {
      const formattedAmount = {
        total: amount,
        int: 0,
        frac: null,
      };

      const splitBalance = amount.toString().split('.');

      formattedAmount.int = splitBalance[0];
      if (splitBalance[1]) {
        formattedAmount.frac = splitBalance[1].slice(0, 3);
      }

      return formattedAmount;
    },
    /**
     * Set list by grouping first
     * @param entities
     */
    setList(entities: Array<ExtendedEntity>, refresh) {
      const filteredEntities = entities.filter((entity, i) => {
        if (entity.failed || entity.contract === 'withdraw') {
          return false;
        }
        entity.date = formatDate(entity.timestamp, 'nameDay');
        entity.otherUser = entity.contract.includes('wire')
          ? this.getUser(entity)
          : null;
        entity.delta = this.getDelta(entity.contract, entity.amount);

        const isWithdrawal = entity.contract.includes('withdraw');
        let txAmount = toFriendlyCryptoVal(entity.amount);
        if (isWithdrawal) {
          txAmount = Math.abs(txAmount);
        }

        entity.amount = txAmount;

        if (i !== 0 || !refresh) {
          this.runningTotal -= this.previousTxAmount;
          this.previousTxAmount = isWithdrawal ? 0 : entity.amount;
        }
        entity.runningTotal = this.formatAmount(this.runningTotal);

        return true;
      });
      const list = groupBy(filteredEntities, 'date');
      Object.keys(list).forEach((v) => {
        this.list.push({
          title: v,
          data: list[v],
        });
      });
      this.loading = false;
    },
    refresh() {
      this.refreshing = true;
      this.wallet.ledger.refresh(this.from, this.to);
    },
  };

  return store;
};

export default createTransactionsListStore;

export type TransactionsListStoreType = ReturnType<
  typeof createTransactionsListStore
>;
