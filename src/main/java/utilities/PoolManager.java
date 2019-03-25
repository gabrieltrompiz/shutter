package utilities;

import java.sql.Connection;

/**
 * @author Ptthappy
 */


public class PoolManager {

	private Pool pool = Pool.getPool();
	private int n = 0;
	private int m = 0;

	public synchronized Connection getConn() {
		m++;
		if (!(pool.getAvailConn() > 0)) {
			if (!addConn()) {
				try {
					waitConn();
				} catch(InterruptedException e) {
					e.printStackTrace();
				}
			}
		}
		return pool.getConn();
	}

	public synchronized void waitConn() throws InterruptedException {
		while(!(pool.getAvailConn() > 0)) {
			wait();
		}

	}

	public synchronized void returnConn(Connection con) {
		n++;
		pool.returnConn(con);
		notify();
	}


	public boolean addConn() {
		return pool.grow();
	}

	public int getAvailConn() {  //Conexiones disponibles
		return pool.getAvailConn();
	}

	public int getTotalConn() {  //Conexiones totales
		return pool.getTotalConn();
	}


	public static PoolManager getPoolManager() {
		return PoolManagerSingletonHolder.pm;
	}

	private static class PoolManagerSingletonHolder {
		private static final PoolManager pm = new PoolManager();
	}

}
